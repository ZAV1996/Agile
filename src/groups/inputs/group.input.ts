import { InputType, Int, Field } from '@nestjs/graphql';
import { IsDate, IsNotEmpty, IsNumber, IsString } from 'class-validator';

@InputType()
export class GroupInput {
    @IsNotEmpty()
    @IsNumber()
    @Field(() => Int, { description: "Идентификатор группы" })
    ID: number;

    @IsNotEmpty()
    @IsString()
    @Field(() => String, { description: "Название группы" })
    group_name: string

    @IsNotEmpty()
    @IsString()
    @Field(() => Date, { description: "Дата и время создания группы" })
    create_date: string

    @IsNotEmpty()
    @IsString()
    @Field(() => Date, { description: "Дата и время последнего обновления группы", nullable: true })
    updated_date: string

    @IsNotEmpty()
    @IsString()
    @Field(() => String, { description: "Описание группы", nullable: true })
    description: string

    
}