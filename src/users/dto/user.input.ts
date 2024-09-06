import { Field, Int, InputType } from '@nestjs/graphql';
import { IsBoolean, IsEmail, IsNotEmpty, IsNumber, IsString } from 'class-validator';
@InputType()
export class UserInput {

    @IsNotEmpty()
    @IsNumber()
    @Field(() => Int, { description: "Идентификатор пользователя" })
    ID: number

    @IsNotEmpty()
    @IsEmail()
    @Field(() => String, { description: "Адрес электронной почты пользователя" })
    email: string

    @IsNotEmpty()
    @IsString()
    @Field(() => String, { description: "Имя пользователя" })
    name: string

    @IsNotEmpty()
    @IsString()
    @Field(() => String, { description: "Фамилия пользователя" })
    surname: string

    @IsNotEmpty()
    @IsString()
    @Field(() => String, { description: "Отчество пользователя" })
    patronymic: string

    @IsNotEmpty()
    @IsString()
    @Field(() => String, { description: "Пароль" })
    password: string

    @IsNotEmpty()
    @IsString()
    @Field(() => String, { description: "Подразделение" })
    department: string

    @IsNotEmpty()
    @IsBoolean()
    @Field(() => Boolean, { description: "Пользовательский статус" })
    isActivated: boolean

    @IsNotEmpty()
    @IsString()
    @Field(() => String, { description: "Токен активации пользователя" })
    activationToken: string | null
}
