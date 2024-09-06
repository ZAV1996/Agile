import { Int, Field, ObjectType, Scalar, GraphQLISODateTime } from '@nestjs/graphql';
import { IsDate, IsNotEmpty, IsNumber, IsString } from 'class-validator';

@ObjectType()
export class GroupType {
    @IsNotEmpty()
    @IsNumber()
    @Field(() => Int, { description: "Идентификатор группы" })
    ID: number;

    @IsNotEmpty()
    @IsString()
    @Field(() => String, { description: "Название группы" })
    group_name: string

    @IsNotEmpty()
    @IsDate()
    @Field(() => Date, { description: "Дата и время создания группы" })
    create_date: Date

    @IsNotEmpty()
    @IsString()
    @Field(() => Date, { description: "Дата и время последнего обновления группы", nullable: true })
    updated_date: Date

    @IsNotEmpty()
    @IsString()
    @Field(() => String, { description: "Описание группы", nullable: true })
    description: string
}