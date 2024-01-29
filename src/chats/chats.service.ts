import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateChatInput } from './dto/create-chat.input';
import { UpdateChatInput } from './dto/update-chat.input';
import { ChatsRepository } from './chats.repository';
import { PipelineStage, Types } from 'mongoose';

@Injectable()
export class ChatsService {
  constructor(private readonly chatsRepository: ChatsRepository) {}

  async create(createChatInput: CreateChatInput, userId: string) {
    return this.chatsRepository.create({
      ...createChatInput,
      userId,
      messages: [],
    });
  }

  async findMany(prePipelineStages: PipelineStage[] = []) {
    const chats = await this.chatsRepository.model.aggregate([
      ...prePipelineStages,
      // We are using the $addFields operator to create a new field
      // called latestMessage that is the last element of the messages
      // array.
      { $set: { latestMessage: { $arrayElemAt: ['$messages', -1] } } },
      // We are using the $unset operator to remove the messages field
      // from the document.
      { $unset: 'messages' },
      // We are using the $lookup operator to populate the latestMessage
      // field with the user that sent the message.
      {
        $lookup: {
          from: 'users',
          localField: 'latestMessage.userId',
          foreignField: '_id',
          as: 'latestMessage.user',
        },
      },
    ]);

    // We are using the $or operator to find a chat that has
    // the given chatId and either the userId or the userIds
    // array contains the userId.
    chats.forEach((chat) => {
      if (!chat.latestMessage?._id) {
        delete chat.latestMessage;
        return;
      }

      // By default, the $lookup operator returns an array.
      // In this case, we know that the array will always have
      // only one element, so we are getting the first element
      // of the array.
      chat.latestMessage.user = chat.latestMessage.user[0];

      delete chat.latestMessage.userId;
      chat.latestMessage.chatId = chat._id;
    });

    return chats;
  }

  async findOne(_id: string) {
    const chats = await this.findMany([
      { $match: { chatId: new Types.ObjectId(_id) } },
    ]);

    if (!chats[0]) {
      throw new NotFoundException(`No chat was found with ID ${_id}`);
    }

    return chats[0];
  }

  update(id: number, updateChatInput: UpdateChatInput) {
    return `This action updates a #${id} chat`;
  }

  remove(id: number) {
    return `This action removes a #${id} chat`;
  }
}
