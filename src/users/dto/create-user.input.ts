import { InputType, Field, OmitType } from '@nestjs/graphql';
import { UserInput } from './user.input';

@InputType()
export class CreateUserInput extends OmitType(UserInput, ["activationToken", "isActivated", "department", "ID"]) {
}
