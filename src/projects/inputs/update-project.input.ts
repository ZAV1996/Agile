import { InputID } from 'src/workflow/inputs/create.input';
import { CreateProjectInput } from './create-project.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateProjectInput extends PartialType(CreateProjectInput) {
  @Field(() => Int)
  ID: number;

  @Field(() => InputID, {nullable: true})
  Workflow: InputID
}
