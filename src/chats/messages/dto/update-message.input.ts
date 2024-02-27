import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';

@InputType()
export class UpdateMessageInput {
  @Field()
  @IsNotEmpty()
  chatId: string;

  @Field()
  @IsNotEmpty()
  messageId: string;

  @Field()
  @IsNotEmpty()
  content: string;
}
