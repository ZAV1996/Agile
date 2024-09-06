import { Field, Int, ObjectType } from "@nestjs/graphql";
import { Cond } from "src/cond/entities/cond.entity";
import { CondType } from "src/cond/types/cond.type";
import { ProjectComponent } from "src/project-components/entities/project-component.entity";
import { ProjectComponentType } from "src/project-components/types/project-component.type";
import { Project } from "src/projects/entities/project.entity";
import { ProjectType } from "src/projects/types/project.type";
import { Status } from "src/status/entities/status.entity";
import { StatusType } from "src/status/types/status.type";
import { User } from "src/users/entities/user.entity";

@ObjectType()
export class IssueType {

    @Field(() => Int, { nullable: true, description: "Идентификатор запроса" })
    ID: number

    @Field(() => ProjectType, { description: "Проект, к которому принадлежит запрос" })
    Project: Project

    @Field(() => String, { description: "Ключ запроса" })
    Key: string

    @Field(() => String, { description: "Тип запроса" })
    IssueType: string

    @Field(() => User, { nullable: true, description: "Пользователь, который внес запрос в систему" })
    Author?: User

    @Field(() => User, { nullable: true, description: "Исполнитель для работы над запросом" })
    Assignee?: User

    @Field(() => String, { description: "Сводка" })
    Title: string

    @Field(() => String, { nullable: true, description: "Описание запроса" })
    Description?: string

    @Field(() => [ProjectComponentType], { nullable: true, description: "Компоненты в рамках проекта, которые связанны с данным запросом" })
    Components?: ProjectComponentType[]

    @Field(() => CondType, { description: "Правило видимости запроса в проекте" })
    visible: Cond

    @Field(() => String, { description: "Приоритет запроса" })
    Priority: "Высокий" | "Средний" | "Низкий"

    @Field(() => StatusType, { description: "Текущее состояние запроса" })
    Status: Status

    @Field(() => IssueType, { nullable: true, description: "Родительская запрос" })
    ParentIssue?: IssueType

    @Field(() => [IssueType], { nullable: true, description: "Дочерние запросы" })
    ChildrenIssues?: IssueType[]

    @Field(() => Date, { description: "Дата и время создания запроса" })
    Create: Date

    @Field(() => Date, { nullable: true, description: "Дата и время последнего обновления запроса" })
    Update?: Date

    @Field(() => Date, { nullable: true, description: "Срок исполнения запроса" })
    DueDate: Date
}
