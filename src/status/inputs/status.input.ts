import { Field, InputType, Int } from "@nestjs/graphql";
import { WorkflowInput } from "../../workflow/inputs/workflow.input";
import { CondInput } from "../../cond/inputs/cond.input";
import { PathInput } from "src/status-path/inputs/path.input";
import { InputID } from "src/workflow/inputs/create.input";

@InputType()
export class StatusInput {

    @Field(() => Int, { description: "Идентификатор статуса" })
    ID: number

    @Field(() => InputID, { description: "Идентификатор родительского бизнес-процесса", nullable: true })
    parent: InputID

    @Field(() => String, { description: "Название статуса" })
    title: string

    @Field(() => CondInput, { description: "Доступ для перехода на этот статус" })
    cond: CondInput

    @Field(() => PathInput, { description: "Правила перехода бизнес-процесса" })
    path: PathInput
}