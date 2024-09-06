import { Resolver, Query, Mutation, Args, Int, Context } from '@nestjs/graphql';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { UpdateUserInput } from './dto/update-user.input';
import { CreateUserInput } from './dto/create-user.input';
import { UseGuards } from '@nestjs/common';
import { AccessGuard } from 'src/common/guards/access.guard';

@Resolver(() => User)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) { }

  @UseGuards(AccessGuard)
  @Mutation(() => User)
  async createUser(@Args('CreateUser') createUserInput: CreateUserInput) {
    return await this.usersService.createUser(createUserInput);
  }


  @UseGuards(AccessGuard)
  @Mutation(() => User)
  async updateUser(@Args('UpdateUser') updateUserInput: UpdateUserInput) {
    return this.usersService.updateUser(updateUserInput);
  }


  @UseGuards(AccessGuard)
  @Mutation(() => Boolean)
  async removeUser(@Args('ID', { type: () => Int }) id: number) {
    return await this.usersService.deleteUser(id) ? true : false;
  }


  @UseGuards(AccessGuard)
  @Query(() => [User], { name: 'getAllUsers', nullable: true })
  getAllUsers() {
    return this.usersService.getAllUsers();
  }

  @UseGuards(AccessGuard)
  @Query(() => User, { name: 'getUserByID', nullable: true })
  getUserByID(@Args('ID', { type: () => Int }) id: number, @Context() ctx: any) {
    return this.usersService.getUserByID(id);
  }
}
