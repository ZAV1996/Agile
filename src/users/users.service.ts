import { ForbiddenException, forwardRef, Inject, Injectable } from '@nestjs/common';
import { UpdateUserInput } from './dto/update-user.input';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { CryptoService } from 'src/crypto-module/crypto.service';
import { CreateUserInput } from './dto/create-user.input';
import { RegisterInputWithToken } from './dto/RegisterWithToken.input';
import { GroupsService } from 'src/groups/groups.service';
import { ProjectsService } from 'src/projects/projects.service';
import { Group } from 'src/groups/entities/group.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    @InjectRepository(Group) private readonly groupService: Repository<Group>,
    private readonly cryptoService: CryptoService,
  ) { }

  async getAllUsers() {
    return await this.userRepository.find({ select: ["ID", 'name', 'surname', 'patronymic', 'email', 'department', "isActivated", "register_date", "updated_date", "groups"] })
  }

  async updateUser(updateUserInput: UpdateUserInput) {
    const user = await this.userRepository.findOneBy({ ID: updateUserInput.ID })
    return await this.userRepository.save({ ...user, ...updateUserInput })
  }

  async confirm(confirmInput: User) {
    return this.userRepository.save(confirmInput);
  }

  async getUserByEmail(email: string): Promise<User | null> {
    return await this.userRepository.findOneBy({ email })
  }

  async getUserByID(ID: number): Promise<User | null> {
    return await this.userRepository.findOneBy({ ID: Number(ID) })
  }

  async getUserByIDWithRelatios(ID: number): Promise<User | null> {
    return await this.userRepository.findOne({ relations: ["groups"], where: { ID } })
  }

  async registerUser(createUserInput: RegisterInputWithToken) {
    const hashPassword = await this.cryptoService.hashData(createUserInput.password)
    return await this.userRepository.save({ ...createUserInput, password: hashPassword })
  }

  async createUser(createUserInput: CreateUserInput) {
    const candidate = await this.userRepository.findOneBy({ email: createUserInput.email });
    if (candidate) {
      throw new ForbiddenException({ message: "Пользователь с таким email уже зарегистрирован" })
    }
    const hashPassword = await this.cryptoService.hashData(createUserInput.password)
    const user = await this.userRepository.save({ ...createUserInput, password: hashPassword });

    let group = await this.groupService.findOne({ relations: ["users"], where: { ID: 2 } });

    if (!group) {
      group = await this.groupService.save({ group_name: "Users", description: "Default group users" })
    }
    group.users.push(user);
    await this.groupService.save(group);
    return user
  }

  async setActivationToken(user: User, activationToken: string) {
    return await this.userRepository.save({ ...user, activationToken })
  }

  async updatePass(ID: number, password: string) {
    const user = await this.userRepository.findOneBy({ ID });
    if (user) {
      return await this.userRepository.save({ ...user, password, activationToken: null })
    }
  }

  async deleteUser(ID: number) {
    return await this.userRepository.delete({ ID })
  }

}
