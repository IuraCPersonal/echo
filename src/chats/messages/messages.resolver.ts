import { Args, Mutation, Query, Resolver, Subscription } from '@nestjs/graphql';
import { MessagesService } from './messages.service';
import { Message } from './entities/message.entity';
import { Inject, UseGuards } from '@nestjs/common';
import { CreateMessageInput } from './dto/create-message.input';
import { CurrentUser } from 'src/auth/current-user.decorator';
import { TokenPayload } from 'src/auth/interfaces/token-payload.interface';
import { GqlAuthGuard } from 'src/auth/guards/gql-auth.guard';
import { GetMessagesArgs } from './dto/get-messages.args';
import { PUB_SUB } from 'src/common/constants/injection-tokens';
import { PubSub } from 'graphql-subscriptions';
import { MESSAGE_CREATED } from './constants/pubsub-triggers';
import { MessageCreatedArgs } from './dto/message-created.args';

@Resolver(() => Message)
export class MessagesResolver {
  constructor(
    private readonly messagesService: MessagesService,
    @Inject(PUB_SUB) private readonly pubSub: PubSub,
  ) {}

  @Mutation(() => Message)
  @UseGuards(GqlAuthGuard)
  async createMessage(
    @Args('createMessageInput') createMessageInput: CreateMessageInput,
    @CurrentUser() user: TokenPayload,
  ) {
    return this.messagesService.createMessage(createMessageInput, user._id);
  }

  @Query(() => [Message], { name: 'messages' })
  @UseGuards(GqlAuthGuard)
  async getMessages(
    @Args() getMessagesArgs: GetMessagesArgs,
    @CurrentUser() user: TokenPayload,
  ) {
    return this.messagesService.getMessages(getMessagesArgs, user._id);
  }

  @Subscription(() => Message, {
    filter: (payload, variables) => {
      // Explanation: We are filtering the subscription payload
      // by the chatId. If the chatId of the payload matches
      // the chatId of the subscription, the payload will be
      // sent to the client.
      return payload.messageCreated.chatId === variables.chatId;
    },
  })
  messageCreated(@Args() _messageCreatedArgs: MessageCreatedArgs) {
    return this.pubSub.asyncIterator(MESSAGE_CREATED);
  }
}
