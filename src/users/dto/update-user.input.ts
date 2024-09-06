import { InputType, Field, Int, OmitType, PartialType } from '@nestjs/graphql';
import { UserInput } from './user.input';
import { IsNotEmpty, IsNumber } from 'class-validator';

@InputType()
export class UpdateUserInput extends PartialType(OmitType(UserInput, ["ID", "activationToken"])) {
  @IsNotEmpty()
  @IsNumber()
  @Field(() => Int, { description: "Идентификатор обновляемого пользователя пользователя (сам ID изменить нельзя)" })
  ID: number
}
