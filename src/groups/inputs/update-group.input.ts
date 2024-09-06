import { CreateGroupInput } from './create-group.input';
import { InputType, Field, Int, PartialType, PickType } from '@nestjs/graphql';
import { GroupInput } from './group.input';

@InputType()
export class UpdateGroupInput extends PartialType(PickType(GroupInput, ["group_name", "description"])) {
  @Field(() => Int)
  ID: number;
}
