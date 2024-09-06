import { Injectable } from '@nestjs/common';
import { InjectRepository, } from '@nestjs/typeorm';
import { Workflow } from './entities/workflow.entity';
import { Repository } from 'typeorm';
import { GroupsService } from 'src/groups/groups.service';
import { CreateWorkflowInput, InputID, UpdateWorkflowInput } from './inputs/create.input';
import { StatusService } from 'src/status/status.service';
import { StatusPathService } from 'src/status-path/status-path.service';
import { CondService } from 'src/cond/cond.service';
import { Status } from 'src/status/entities/status.entity';
interface IUpdateWorkflow {

}
@Injectable()
export class WorkflowService {
  constructor(
    @InjectRepository(Workflow) private readonly workflowRepo: Repository<Workflow>,
    private groupService: GroupsService,
    private statusService: StatusService,
    private pathService: StatusPathService,
    private condService: CondService,
  ) { }

  async create_workflow(input: CreateWorkflowInput) {
    const workflow = await await this.workflowRepo.save({
      title: input.title,
      description: input.description,
    })
    const status1 = await this.statusService.createStatus({ title: "Назначено", parent: workflow })
    const status2 = await this.statusService.createStatus({ title: "В работе", parent: workflow })
    const status3 = await this.statusService.createStatus({ title: "Выполнено", parent: workflow })
    await this.pathService.updatePath({ ID: status1.path.ID!, from: [{ ID: status2.ID! }, { ID: status3.ID! }], to: [{ ID: status2.ID! }, { ID: status3.ID! }] })
    await this.pathService.updatePath({ ID: status2.path.ID!, from: [{ ID: status1.ID! }, { ID: status3.ID! }], to: [{ ID: status1.ID! }, { ID: status3.ID! }] })
    await this.pathService.updatePath({ ID: status3.path.ID!, from: [{ ID: status1.ID! }, { ID: status2.ID! }], to: [{ ID: status1.ID! }, { ID: status2.ID! }] })
    return await this.workflowRepo.findOne({relations: ["statuses"], where: {ID: workflow.ID}})
  }

  async updateWorkflow(input: UpdateWorkflowInput) {
    return await this.workflowRepo.save(input)
  }


  async remove_workflow({ ID }: InputID) {
    return (await this.workflowRepo.delete({ ID })).raw
  }

  async getWorkflowByID({ ID }: InputID) {
    return await this.workflowRepo.findOne({ relations: ["statuses"], where: { ID } })
  }

  async getAllWorkflows() {
    return await this.workflowRepo.find({ relations: ["statuses"] })
  }

}
