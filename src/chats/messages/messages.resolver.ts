import { Args, Mutation, Query, Resolver, Subscription } from '@nestjs/graphql';
import { MessagesService } from './messages.service';
import { Message } from './entities/message.entity';
import { Inject, UseGuards } from '@nestjs/common';
import { CreateMessageInput } from './dto/create-message.input';
import { CurrentUser } from 'src/auth/current-user.decorator';
import { TokenPayload } from 'src/auth/interfaces/token-payload.interface';
import { GqlAuthGuard } from 'src/auth/guards/gql-auth.guard';
import { GetMessagesArgs } from './dto/get-messages.args';
import { MessageCreatedArgs } from './dto/message-created.args';

@Resolver(() => Message)
export class MessagesResolver {
  constructor(private readonly messagesService: MessagesService) {}

  @Mutation(() => Message)
  @UseGuards(GqlAuthGuard)
  async createMessage(
    @Args('createMessageInput') createMessageInput: CreateMessageInput,
    @CurrentUser() user: TokenPayload,
  ): Promise<Message> {
    return this.messagesService.createMessage(createMessageInput, user._id);
  }

  @Query(() => [Message], { name: 'messages' })
  @UseGuards(GqlAuthGuard)
  async getMessages(
    @Args() getMessagesArgs: GetMessagesArgs,
  ): Promise<Message[]> {
    return this.messagesService.getMessages(getMessagesArgs);
  }

  @Subscription(() => Message, {
    filter: (payload, variables: MessageCreatedArgs, context) => {
      // Explanation: We are filtering the subscription payload
      // by the chatId. If the chatId of the payload matches
      // the chatId of the subscription, the payload will be
      // sent to the client.
      const userId = context.req.user._id;
      const message: Message = payload.messageCreated;

      return (
        variables.chatIds.includes(message.chatId) &&
        userId !== message.user._id.toHexString()
      );
    },
  })
  messageCreated(@Args() _messageCreatedArgs: MessageCreatedArgs) {
    return this.messagesService.messageCreated();
  }
}