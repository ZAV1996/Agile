import { Field, InputType, Int } from "@nestjs/graphql";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";
import { StatusInput } from "../../status/inputs/status.input";


@InputType()
export class WorkflowInput {
    @IsNotEmpty()
    @IsNumber()
    @Field(() => Int, { description: "ID бизнес-процесса" })
    ID: number;

    @IsString()
    @IsNotEmpty()
    @Field(() => String, { description: "Название бизнес-процесса" })
    title: string

    @IsNotEmpty()
    @Field(() => [StatusInput], { description: "Массив статусов бизнес-процесса" })
    statuses: StatusInput[]

    @IsString()
    @IsNotEmpty()
    @Field(() => String, { description: "Описание бизнес-процесса" })
    description: string

    @Field(() => Date, { description: "Дата создания бизнес процесса" })
    create_date: Date

    @Field(() => Date, { description: "Дата обновления бизнес процесса" })
    update_date: Date
}
