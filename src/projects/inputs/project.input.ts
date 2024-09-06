import { Field, Int, InputType, PickType } from '@nestjs/graphql';
import { IsInt, IsNotEmpty, IsString } from 'class-validator';
import { User } from 'src/users/entities/user.entity';
@InputType()
export class ProjectInput {
    @Field(() => Int, { description: 'id проекта' })
    ID: number;

    @IsNotEmpty()
    @IsString()
    @Field(() => String, { description: "Имя проекта", nullable: false })
    ProjectName: string;

    @IsNotEmpty()
    @IsString()
    @Field(() => String, { description: "Описание проекта", nullable: true })
    Description: string;

    @IsNotEmpty()
    @IsInt()
    @Field(() => Int, { description: "Руководитель проекта", nullable: true })
    Lead: number

    @IsNotEmpty()
    @IsString()
    @Field(() => String, { description: 'Ключ проекта', nullable: true })
    Key: string

    @IsNotEmpty()
    @IsString()
    @Field(() => String, { description: "Изображение проекта", nullable: true })
    Image: string //url
}
