import { Field, InputType, Int, ObjectType } from "@nestjs/graphql";
import { Cond } from "src/cond/entities/cond.entity";
import { InputUser } from "src/cond/inputs/user_cond.input";
import { CondType } from "src/cond/types/cond.type";
import { ProjectComponent } from "src/project-components/entities/project-component.entity";
import { ProjectComponentType } from "src/project-components/types/project-component.type";
import { Project } from "src/projects/entities/project.entity";
import { ProjectType } from "src/projects/types/project.type";
import { Status } from "src/status/entities/status.entity";
import { StatusType } from "src/status/types/status.type";
import { User } from "src/users/entities/user.entity";
import { InputID } from "src/workflow/inputs/create.input";

@InputType()
export class IssueInput {

    @Field(() => Int, { description: "Идентификатор запроса" })
    ID: number

    @Field(() => InputID, { description: "Проект, к которому принадлежит запрос" })
    Project: InputID


    @Field(() => String, { description: "Тип запроса" })
    IssueType: string

    @Field(() => InputUser, { description: "Пользователь, который внес запрос в систему" })
    Author: InputUser

    @Field(() => InputUser, { description: "Исполнитель для работы над запросом" })
    Assignee: InputUser

    @Field(() => String, { description: "Сводка" })
    Title: string

    @Field(() => String, { description: "Описание запроса" })
    Description: string

    @Field(() => [InputID], { description: "Компоненты в рамках проекта, которые связанны с данным запросом" })
    Components: InputID[]

    @Field(() => InputID, { description: "Правило видимости запроса в проекте" })
    visible: InputID

    @Field(() => String, { description: "Приоритет запроса" })
    Priority: "Высокий" | "Средний" | "Низкий"

    @Field(() => InputID, { description: "Текущее состояние запроса" })
    Status: InputID

    @Field(() => InputID, { description: "Родительская запрос" })
    ParentIssue: InputID

    @Field(() => [InputID], { description: "Дочерние запросы" })
    ChildrenIssues: InputID[]

    @Field(() => Date, { description: "Дата и время создания запроса" })
    Create: Date

    @Field(() => Date, { description: "Дата и время последнего обновления запроса" })
    Update: Date

    @Field(() => Date, { description: "Срок исполнения запроса" })
    DueDate: Date
}
