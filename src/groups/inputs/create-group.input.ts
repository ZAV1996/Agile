import { InputType, Int, Field, PickType, PartialType } from '@nestjs/graphql';
import { GroupInput } from './group.input';
import { IsNotEmpty, IsString } from 'class-validator';

@InputType()
export class CreateGroupInput extends PartialType(PickType(GroupInput, ["description"])) {
  @IsNotEmpty()
  @IsString()
  @Field(() => String, { description: "Название группы" })
  group_name: string
}
