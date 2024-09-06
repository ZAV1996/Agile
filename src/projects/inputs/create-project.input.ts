import { Field, PartialType, PickType, InputType, Scalar, Int } from '@nestjs/graphql';
import { User } from 'src/users/entities/user.entity';
import { ProjectInput } from './project.input';

@InputType()
export class CreateProjectInput extends PartialType(PickType(ProjectInput, ["Description", "Image"])) {
  @Field(() => String, { description: "Имя проекта", nullable: false })
  ProjectName: string;

  @Field(() => Int, { description: "Руководитель проекта" })
  Lead: number

  @Field(() => String, { description: 'Ключ проекта' })
  Key: string

}

