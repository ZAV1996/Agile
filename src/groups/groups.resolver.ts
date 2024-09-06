import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { GroupsService } from './groups.service';
import { GroupType } from './types/group.type';
import { UseGuards } from '@nestjs/common';
import { User } from 'src/users/entities/user.entity';
import { CreateGroupInput } from './inputs/create-group.input';
import { UpdateGroupInput } from './inputs/update-group.input';
import { GroupMemberInput } from './inputs/groupMember.input';
import { AccessGuard } from 'src/common/guards/access.guard';
@Resolver(() => GroupType)
export class GroupsResolver {
  constructor(
    private readonly groupsService: GroupsService
  ) { }

  @UseGuards(AccessGuard)
  @Query(() => [GroupType])
  async getAllGroups() {
    return await this.groupsService.getAllGroups();
  }

  @UseGuards(AccessGuard)
  @Query(() => GroupType)
  async getGroupByID(@Args("GetGropByID", { type: () => Int }) id: number) {
    return await this.groupsService.getGroupByID(id)
  }


  @UseGuards(AccessGuard)
  @Mutation(() => GroupType)
  async createGroup(@Args('CreateGroupInput') createGroupInput: CreateGroupInput) {
    return await this.groupsService.createGroup(createGroupInput);
  }

  @UseGuards(AccessGuard)
  @Mutation(() => GroupType)
  async updateGroup(@Args("UpdateGroupInput") updateGroupInput: UpdateGroupInput) {
    return this.groupsService.updateGroup(updateGroupInput);
  }

  @UseGuards(AccessGuard)
  @Mutation(() => [GroupType])
  async removeGroup(@Args("RemoveGroup", { type: () => Int, nullable: true }) id: number) {
    return await this.groupsService.removeGroup(id)
  }

  @UseGuards(AccessGuard)
  @Mutation(() => [User])
  async removeUserFromGroup(@Args("removeUserFromGroup", { type: () => GroupMemberInput }) { groupID, userID }: GroupMemberInput) {
    return await this.groupsService.removeUserFromGroup(groupID, userID);
  }

  @UseGuards(AccessGuard)
  @Mutation(() => [User])
  async addUserInGroup(@Args("AddUserInGroup", { type: () => GroupMemberInput }) { groupID, userID }: GroupMemberInput) {
    return await this.groupsService.addUserInGroup(groupID, userID);
  }

  @UseGuards(AccessGuard)
  @Query(() => [User])
  async getUsersInGroup(@Args("GetUsersInGroup", { type: () => Int }) groupID: number) {
    const users = await this.groupsService.getGroupUsersByID(groupID);
    return users;
  }

  @UseGuards(AccessGuard)
  @Query(() => [GroupType])
  async getUserGroups(@Args("GetUserGroups", { type: () => Int }) groupID: number) {
    const users = await this.groupsService.getUserGroups(groupID);
    return users;
  }
}
