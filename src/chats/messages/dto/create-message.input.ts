import { Field, InputType } from '@nestjs/graphql';
import { Prop } from '@nestjs/mongoose';
import { IsNotEmpty } from 'class-validator';

@InputType()
export class CreateMessageInput {
  @Field()
  @IsNotEmpty()
  content: string;

  @Field()
  @IsNotEmpty()
  chatId: string;
}
