import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { ProjectsService } from './projects.service';
import { Project } from './entities/project.entity';
import { CreateProjectInput } from './inputs/create-project.input';
import { UpdateProjectInput } from './inputs/update-project.input';
import { ProjectType } from './types/project.type';
import { UseGuards } from '@nestjs/common';
import { AccessGuard } from 'src/common/guards/access.guard';

@Resolver(() => Project)
export class ProjectsResolver {
  constructor(private readonly projectsService: ProjectsService) { }

  @UseGuards(AccessGuard)
  @Mutation(() => ProjectType)
  async createProject(@Args('createProjectInput') createProjectInput: CreateProjectInput) {
    return await this.projectsService.createProject(createProjectInput);
  }

  @UseGuards(AccessGuard)
  @Mutation(() => ProjectType)
  async updateProject(@Args('UpdateProject') updateProject: UpdateProjectInput) {
    return await this.projectsService.updateProject(updateProject);
  }

  @UseGuards(AccessGuard)
  @Mutation(() => [ProjectType], { nullable: true })
  async deleteProject(@Args("ProjectID", { type: () => Int }) ID: number) {
    return await this.projectsService.deleteProject(ID);
  }

  @UseGuards(AccessGuard)
  @Query(() => [ProjectType])
  async getAllProjects() {
    return await this.projectsService.getAllProjects()
  }

  @UseGuards(AccessGuard)
  @Query(() => ProjectType)
  async getProjectByID(@Args("ProjectID", { type: () => Int }) ID: number) {
    return await this.projectsService.getProjectByID(ID)
  }

  @UseGuards(AccessGuard)
  @Query(() => [ProjectType])
  async searchProject(@Args("SearchProject", { type: () => String }) searchText: string) {
    return await this.projectsService.searchProject(searchText)
  }
}
