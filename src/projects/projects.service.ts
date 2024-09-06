import { Injectable } from '@nestjs/common';
import { CreateProjectInput } from './inputs/create-project.input';
import { UpdateProjectInput } from './inputs/update-project.input';
import { InjectRepository } from '@nestjs/typeorm';
import { Project } from './entities/project.entity';
import { Like, Repository } from 'typeorm';
import { UsersService } from 'src/users/users.service';
import { ForbiddenError } from '@nestjs/apollo';
import { User } from 'src/users/entities/user.entity';
import { join } from 'path';
import { WorkflowService } from 'src/workflow/workflow.service';

@Injectable()
export class ProjectsService {
  constructor(
    @InjectRepository(Project) private projectRepository: Repository<Project>,
    private userServive: UsersService,
    private workflowService: WorkflowService,
  ) { }

  async createProject(createProjectInput: CreateProjectInput) {
    const user = await this.userServive.getUserByID(createProjectInput.Lead);
    if (!user)
      throw new ForbiddenError("Пользователь не найден");

    const pr = await this.projectRepository.findOneBy({ Key: createProjectInput.Key })
    if (pr) {
      throw new ForbiddenError("Проект с таким ключом уже существует")
    }
    const workflow = await this.workflowService.create_workflow({ title: `Workflow проекта ${createProjectInput.ProjectName}` })
    const project = await this.projectRepository.save({ ...createProjectInput, Lead: user });
    if (workflow) {
      await this.workflowService.updateWorkflow({ ID: workflow.ID, parent: [project] })
    }
    return project
  }

  async updateProject(updateProjectInput: UpdateProjectInput) {
    const project = await this.projectRepository.findOne({ relations: ["Lead", "Workflow"], where: { ID: updateProjectInput.ID } })
    if (!project)
      throw new ForbiddenError("Проект не найден")
    if (updateProjectInput.Lead !== undefined) {
      const candidate = await this.userServive.getUserByID(updateProjectInput.Lead)
      if (candidate) {
        project.Lead = candidate
      }
    }
    return await this.projectRepository.save({ ...project, ...updateProjectInput, Lead: project.Lead })
  }

  async deleteProject(ID: number) {
    const project = await this.getProjectByID(ID);
    if (!project) {
      throw new ForbiddenError("Проект не найден")
    }
    return await this.projectRepository.delete({ ID }) ? await this.getAllProjects() : null
  }

  async getAllProjects() {
    return await this.projectRepository.find({ relations: ["Lead", "Workflow", "Components"] })
  }

  async getProjectByID(ID: number) {
    return await this.projectRepository.findOne({ relations: ["Lead", "Workflow", "Components"], where: { ID } })
  }

  async searchProject(findText: string) {
    return await this.projectRepository.find({
      relations: ["Lead"],
      where: [
        { ProjectName: Like(`%${findText}%`) },
        { Key: Like(`%${findText}%`) },
        { Description: Like(`%${findText}%`) },
      ],
    });
  }
}
