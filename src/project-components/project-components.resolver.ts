import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { ProjectComponentsService } from './project-components.service';
import { ProjectComponent } from './entities/project-component.entity';
import { ProjectComponentType } from './types/project-component.type';
import { CreateProjectComponentInput } from './inputs/create.input';
import { InputID } from 'src/workflow/inputs/create.input';
import { UpdateProjectComponentInput } from './inputs/update.input';

@Resolver(() => ProjectComponentType)
export class ProjectComponentsResolver {
  constructor(private readonly projectComponentsService: ProjectComponentsService) { }

  @Mutation(() => ProjectComponentType)
  createProjectComponent(@Args('createProjectComponentInput') createProjectComponentInput: CreateProjectComponentInput) {
    return this.projectComponentsService.createComponent(createProjectComponentInput);
  }
  @Mutation(() => ProjectComponentType)
  async updateComponent(@Args("updateProjectComponentInput") input: UpdateProjectComponentInput) {
    return await this.projectComponentsService.updateComponent(input)
  }
  @Mutation(() => [String])
  async deleteComponent(@Args("inputID") input: InputID) {
    return await this.projectComponentsService.deleteComponent(input)
  }
}
