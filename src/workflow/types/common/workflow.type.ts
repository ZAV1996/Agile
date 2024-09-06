import { Field, Int, ObjectType } from "@nestjs/graphql";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";
import { StatusType } from "../../../status/types/status.type";

@ObjectType()
export class WorkflowType {
    @IsNotEmpty()
    @IsNumber()
    @Field(() => Int, { description: "ID бизнес-процесса" })
    ID: number;

    @IsString()
    @IsNotEmpty()
    @Field(() => String, { description: "Название бизнес-процесса" })
    title: string

    @IsNotEmpty()
    @Field(() => [StatusType], { description: "Массив статусов бизнес-процесса" })
    statuses: StatusType[]

    @IsString()
    @IsNotEmpty()
    @Field(() => String, { description: "Описание бизнес-процесса", nullable: true })
    description: string

    @Field(() => Date, { description: "Дата создания бизнес процесса" })
    create_date: Date

    @Field(() => Date, { description: "Дата обновления бизнес процесса" })
    update_date: Date
}
