import { IntersectionType, PickType } from "@nestjs/graphql";
import { UserInput } from "./user.input";
import { RegisterInput } from "src/auth/dto/register.input";

export class RegisterInputWithToken extends IntersectionType(RegisterInput, PickType(UserInput, ["activationToken"])) { }