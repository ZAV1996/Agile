import { Field, InputType, PickType } from "@nestjs/graphql"
import { IsNotEmpty, IsString } from "class-validator"
import { UserInput } from "src/users/dto/user.input"

@InputType()
export class ForgotInput extends PickType(UserInput, ["password", "activationToken", "ID"]) {
    @IsNotEmpty()
    @IsString()
    @Field()
    double_password: string
}