import { Field, InputType, Int } from "@nestjs/graphql";
import { IsInt, IsNotEmpty } from "class-validator";

@InputType()
export class GroupMemberInput {
    @Field(() => Int)
    @IsNotEmpty()
    userID: number;

    @Field(() => Int)
    @IsInt()
    groupID: number;
}