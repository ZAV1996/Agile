import { IntersectionType, PickType } from "@nestjs/graphql";
import { UpdateUserInput } from "./update-user.input";
import { UserInput } from "./user.input";

export class UpdateUserInputWithToken extends IntersectionType(UpdateUserInput, PickType(UserInput, ["activationToken"])) { }