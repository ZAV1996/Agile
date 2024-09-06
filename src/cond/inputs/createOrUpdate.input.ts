import { Field, InputType, Int, OmitType, PartialType } from "@nestjs/graphql";
import { CondInput } from "./cond.input";


@InputType()
export class CreateOrUpdateCondInput extends PartialType(OmitType(CondInput, ["parent"])) {
    @Field(() => Int, { nullable: true })
    ID?: number
}
