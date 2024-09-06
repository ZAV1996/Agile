import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { StatusService } from './status.service';
import { CreateOrUpdateStatusInput } from './inputs/createOrUpdate.input';
import { StatusType } from './types/status.type';
import { InputID } from 'src/workflow/inputs/create.input';


@Resolver(() => StatusType)
export class StatusResolver {
  constructor(private readonly statusService: StatusService) { }

  @Mutation(() => StatusType)
  async createStatus(@Args("createStatusInput") input: CreateOrUpdateStatusInput) {
    return await this.statusService.createStatus(input)
  }

  @Mutation(() => StatusType)
  async updateStatus(@Args("createStatusInput") input: CreateOrUpdateStatusInput) {
    return await this.statusService.updateStatus(input)
  }

  @Mutation(() => [String])
  async deleteStatus(@Args("deleteStatusInput") input: InputID) {
    return await this.statusService.deleteStatus(input)
  }

  @Query(() => [StatusType])
  async getAllStatuses() {
    return await this.statusService.getAllStatuses()
  }
}
