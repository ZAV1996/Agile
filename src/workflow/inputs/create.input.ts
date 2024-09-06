import { Field, InputType, Int, PartialType, PickType } from "@nestjs/graphql";
import { CreateStatusInput } from "../../status/inputs/create.input";
import { WorkflowInput } from "./workflow.input";
import { StatusInput } from "src/status/inputs/status.input";
import { CreateOrUpdateStatusInput } from "src/status/inputs/createOrUpdate.input";

@InputType()
export class CreateWorkflowInput extends PartialType(PickType(WorkflowInput, ["description"])) {
    @Field(() => String)
    title: string
}

@InputType()
export class UpdateWorkflowInput {
    @Field(() => Int, { nullable: false })
    ID: number

    @Field(() => [InputID], { nullable: true })
    parent?: [InputID]

    @Field(() => String, { nullable: true })
    title?: string

    @Field(() => [CreateOrUpdateStatusInput], { nullable: true })
    statuses?: CreateOrUpdateStatusInput[]
}

@InputType()
export class InputID {
    @Field(() => Int)
    ID: number
}