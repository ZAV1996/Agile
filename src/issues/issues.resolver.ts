import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { IssuesService } from './issues.service';
import { Issue } from './entities/issue.entity';
import { InputID } from 'src/workflow/inputs/create.input';
import { IssueType } from './Types/issue.type';
import { CreateIssueInput } from './inputs/create.input';
import { UpdateIssueInput } from './inputs/update.input';

@Resolver(() => IssueType)
export class IssuesResolver {
  constructor(private readonly issuesService: IssuesService) { }

  @Query(() => [IssueType], { nullable: true })
  async getAllIssuesByProjectID(@Args("InputID") id: InputID) {
    return await this.issuesService.getAllIssuesByProjectID(id)
  }

  @Mutation(() => IssueType)
  async createIssue(@Args("createIssueInput") input: CreateIssueInput) {
    return await this.issuesService.createIssue(input)
  }

  @Mutation(() => IssueType)
  async updateIssue(@Args("updateIssueInput") input: UpdateIssueInput) {
    return await this.issuesService.updateIssue(input)
  }

  @Mutation(() => [String])
  async deleteIssue(@Args("inputID") input: InputID) {
    return await this.issuesService.deleteIssue(input);
  }
}
