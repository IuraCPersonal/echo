import { Injectable } from '@nestjs/common';
import { ChatsRepository } from '../chats.repository';
import { CreateMessageInput } from './dto/create-message.input';
import { Message } from './entities/message.entity';
import { Types } from 'mongoose';

@Injectable()
export class MessagesService {
  constructor(private readonly chatsRepository: ChatsRepository) {}

  async createMessage({ content, chatId }: CreateMessageInput, userId: string) {
    const message: Message = {
      content,
      userId,
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
        $or: [
          {
            userId,
          },
          {
            userIds: {
              $in: [userId],
            },
          },
        ],
      },
      {
        $push: {
          messages: message,
        },
      },
    );

    return message;
  }
}
