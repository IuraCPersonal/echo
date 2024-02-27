import { Inject, Injectable } from '@nestjs/common';
import { ChatsRepository } from '../chats.repository';
import { CreateMessageInput } from './dto/create-message.input';
import { Types } from 'mongoose';
import { GetMessagesArgs } from './dto/get-messages.args';
import { PubSub } from 'graphql-subscriptions';
import { PUB_SUB } from 'src/common/constants/injection-tokens';
import { MESSAGE_CREATED } from './constants/pubsub-triggers';
import { MessageDocument } from './entities/message.document';
import { Message } from './entities/message.entity';
import { UsersService } from 'src/users/users.service';
import { UpdateMessageInput } from './dto/update-message.input';

@Injectable()
export class MessagesService {
  constructor(
    private readonly chatsRepository: ChatsRepository,
    private readonly usersService: UsersService,
    @Inject(PUB_SUB) private readonly pubSub: PubSub,
  ) {}

  async createMessage({ content, chatId }: CreateMessageInput, userId: string) {
    const messageDocument: MessageDocument = {
      content,
      userId: new Types.ObjectId(userId),
      createdAt: new Date(),
      _id: new Types.ObjectId(),
    };

    // Explanation:
    // We are using the $or operator to find a chat that has
    // the given chatId and either the userId or the userIds
    // array contains the userId.
    // Then we are using the $push operator to push the message
    // to the messages array.
    await this.chatsRepository.findOneAndUpdate(
      {
        _id: chatId,
      },
      {
        $push: {
          messages: messageDocument,
        },
      },
    );

    const message: Message = {
      ...messageDocument,
      chatId,
      user: await this.usersService.findOne(userId),
    };

    await this.pubSub.publish(MESSAGE_CREATED, {
      messageCreated: message,
    });

    return message;
  }

  async countMessages(chatId: string) {
    const a = (
      await this.chatsRepository.model.aggregate([
        { $match: { _id: new Types.ObjectId(chatId) } },
        {
          $unwind: {
            path: '$messages',
            preserveNullAndEmptyArrays: true,
          },
        },
        { $count: 'messages' },
      ])
    )[0];

    return a;
  }

  async getMessages({ chatId, skip, limit }: GetMessagesArgs) {
    const messages = await this.chatsRepository.model.aggregate([
      // Explanation:
      // We are using the $match operator to find a chat
      // that has the given chatId.
      { $match: { _id: new Types.ObjectId(chatId) } },
      // Explanation:
      // We are using the $unwind operator to deconstruct
      // the messages array.
      { $unwind: '$messages' },
      // Explanation:
      // We are using the $replaceRoot operator to promote the
      // messages field to the top level.
      { $replaceRoot: { newRoot: '$messages' } },
      { $sort: { createdAt: -1 } },
      { $skip: skip },
      { $limit: limit },
      // Explanation:
      // We are using the $lookup operator to join the users
      // collection with the messages collection.
      {
        $lookup: {
          from: 'users',
          localField: 'userId',
          foreignField: '_id',
          as: 'user',
        },
      },
      { $unwind: '$user' },
      // Remove userId property from the message object.
      { $unset: 'userId' },
      { $set: { chatId } },
    ]);

    for (const message of messages) {
      message.user = this.usersService.toEntiry(message.user);
    }
  }

  async messageCreated() {
    return this.pubSub.asyncIterator(MESSAGE_CREATED);
  }

  async updateMessage({ chatId, messageId, content }, userId: string) {
    const chat = await this.chatsRepository.model.findOne({
      _id: chatId,
      'messages._id': messageId,
    });

    if (!chat) {
      throw new Error('Chat not found');
    }

    const message = chat.messages.find((m) => m._id.equals(messageId));

    if (message.userId.toHexString() !== userId) {
      throw new Error('Unauthorized');
    }

    message.content = content;

    await chat.save();

    return message;
  }
}
