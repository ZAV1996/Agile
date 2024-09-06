import { Resolver, Mutation, Query, Int, Args } from '@nestjs/graphql';
import { WorkflowService } from './workflow.service';
import { WorkflowType } from './types/common/workflow.type';
import { CreateWorkflowInput, InputID, UpdateWorkflowInput } from './inputs/create.input';
import { DeleteResult } from 'typeorm';


@Resolver(() => WorkflowType)
export class WorkflowResolver {
  constructor(
    private readonly workflowService: WorkflowService) { }

  @Mutation(() => WorkflowType)
  async createWorkflow(@Args("createWorkflowInput") createWorkflowInput: CreateWorkflowInput) {
    return await this.workflowService.create_workflow(createWorkflowInput)
  }
  @Mutation(() => WorkflowType)
  async updateWorkflow(@Args("updateWorkflowInput") updateWorkflowInput: UpdateWorkflowInput) {
    return await this.workflowService.updateWorkflow(updateWorkflowInput)
  }

  @Mutation(() => [String])
  async deleteWorkflow(@Args("InputID") ID: InputID) {
    return await this.workflowService.remove_workflow(ID)
  }

  @Query(() => WorkflowType)
  async getWorkflowByID(@Args("InputID") ID: InputID) {
    return await this.workflowService.getWorkflowByID(ID)
  }

  @Query(() => [WorkflowType])
  async getAllWorkflows() {
    return await this.workflowService.getAllWorkflows()
  }


}
