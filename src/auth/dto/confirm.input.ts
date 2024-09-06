import { InputType, PickType } from '@nestjs/graphql';
import { UserInput } from "src/users/dto/user.input";

@InputType()
export class ConfirmInput extends PickType(UserInput, ["ID", "activationToken"]) { }