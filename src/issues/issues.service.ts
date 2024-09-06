import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Issue } from './entities/issue.entity';
import { Repository } from 'typeorm';
import { InputID } from 'src/workflow/inputs/create.input';
import { CreateIssueInput } from './inputs/create.input';
import { ProjectsService } from 'src/projects/projects.service';
import { ForbiddenError } from '@nestjs/apollo';
import { UpdateIssueInput } from './inputs/update.input';
import { ProjectComponent } from 'src/project-components/entities/project-component.entity';
import { ProjectComponentType } from 'src/project-components/types/project-component.type';
import { User } from 'src/users/entities/user.entity';
import { InputUser } from 'src/cond/inputs/user_cond.input';

@Injectable()
export class IssuesService {
    constructor(
        @InjectRepository(Issue) private issueRepo: Repository<Issue>,
        private projectService: ProjectsService
    ) { }

    async getAllIssuesByProjectID({ ID }: InputID) {
        return await this.issueRepo.find({ where: { Project: { ID } }, relations: ["Author", "Assignee"] })
    }

    async createIssue(input: CreateIssueInput) {
        const project = await this.projectService.getProjectByID(input.Project.ID)
        if (!project)
            throw new ForbiddenError("Выберите проект")
        const Status = project.Workflow.statuses[0];
        const components: ProjectComponent[] = []
        for (const component of project.Components) {
            for (const item of input?.Components ?? []) {
                if (component.ID === item.ID)
                    components.push(component)
                else continue
            }
        }
        let assignee: InputUser | undefined = undefined
        if (!input.Assignee) {
            if (components.length > 0) {
                components.sort((a, b) => {
                    if (a.title < b.title) {
                        return -1
                    }
                    if (a.title > b.title) {
                        return 1
                    }
                    return 0
                })

            }
            assignee = components.find(component => component.defaultExecuter)?.defaultExecuter ?? undefined
        }
        else assignee = input.Assignee

        return await this.issueRepo.save({ ...input, Status: { ID: Status.ID }, Key: project.Key, Components: components, Assignee: assignee })
    }
    async updateIssue(input: UpdateIssueInput) {
        return await this.issueRepo.save(input)
    }

    async deleteIssue({ ID }: InputID) {
        return (await this.issueRepo.delete({ ID })).raw
    }
}
