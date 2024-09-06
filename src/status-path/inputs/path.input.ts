import { Field, InputType, Int } from "@nestjs/graphql";
import { StatusInput } from "src/status/inputs/status.input";
import { InputID } from "src/workflow/inputs/create.input";

@InputType()
export class PathInput {
    @Field(() => Int, { description: "Идентификатор перехода", nullable: false })
    ID: number

    @Field(() => [InputID], { description: "Откуда возможен переход на этот статус" })
    from?: InputID[]

    @Field(() => [InputID], { description: "Куда возможен переход с этого статуса" })
    to?: InputID[]
}