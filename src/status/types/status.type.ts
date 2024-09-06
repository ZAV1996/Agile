import { Field, Int, ObjectType } from "@nestjs/graphql";
import { WorkflowType } from "../../workflow/types/common/workflow.type";
import { CondType } from "../../cond/types/cond.type";
import { PathType } from "src/status-path/types/path.type";

@ObjectType()
export class StatusType {
    @Field(() => Int, { description: "Идентификатор статуса" })
    ID: number

    @Field(() => WorkflowType, { description: "Идентификатор родительского бизнес-процесса", nullable: true })
    parent: WorkflowType

    @Field(() => String, { description: "Название статуса", nullable: true })
    title: string

    @Field(() => CondType, { description: "Доступ для перехода на этот статус", nullable: true })
    cond: CondType

    @Field(() => PathType, { nullable: true })
    path: PathType

}