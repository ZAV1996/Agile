import { ObjectType, Field, Int } from '@nestjs/graphql';
import { ProjectComponentType } from 'src/project-components/types/project-component.type';
import { User } from 'src/users/entities/user.entity';
import { WorkflowType } from 'src/workflow/types/common/workflow.type';
@ObjectType()
export class ProjectType {
    @Field(() => Int, { description: 'id проекта' })
    ID: number;

    @Field(() => String, { description: "Имя проекта", nullable: false })
    ProjectName: string;

    @Field(() => String, { description: "Описание проекта", nullable: true })
    Description: string;

    @Field(() => User, { description: "Руководитель проекта", nullable: true })
    Lead: User

    @Field(() => String, { description: 'Ключ проекта', nullable: true })
    Key: string

    @Field(() => String, { description: "Изображение проекта", nullable: true })
    Image: string //url

    @Field(() => WorkflowType, { description: "Схема бизнес процесса", nullable: true })
    Workflow: WorkflowType

    @Field(() => [ProjectComponentType], { description: "Компоненты проекта", nullable: true })
    Components: ProjectComponentType[]
}
