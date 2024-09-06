import { InputType, PickType } from "@nestjs/graphql";
import { UserInput } from "src/users/dto/user.input";

@InputType()
export class CreateTokenInput extends PickType(UserInput, ["ID", "email", "name", "patronymic", "surname"]) { }