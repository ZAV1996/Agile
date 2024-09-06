import { Field, InputType, Int, OmitType } from "@nestjs/graphql";
import { StatusInput } from "./status.input";
import { CreateOrUpdateCondInput } from "src/cond/inputs/createOrUpdate.input";
import { PathInput } from "src/status-path/inputs/path.input";

@InputType()
export class CreateStatusInput extends OmitType(StatusInput, ["ID", "cond", "path", "parent"]) {
    @Field(() => Int)
    ID: number

    @Field(() => CreateOrUpdateCondInput)
    cond: CreateOrUpdateCondInput

    @Field(() => PathInput)
    path: PathInput
}