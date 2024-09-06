import { Field, Int, ObjectType } from "@nestjs/graphql";
import { StatusType } from "src/status/types/status.type";

@ObjectType()
export class PathType {
    @Field(() => Int, { description: "Идентификатор перехода" })
    ID: number

    @Field(() => [StatusType], { description: "Откуда возможен переход на этот статус", nullable: true })
    from: StatusType[]

    @Field(() => [StatusType], { description: "Куда возможен переход с этого статуса", nullable: true })
    to: StatusType[]
}