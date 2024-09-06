import { forwardRef, Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersResolver } from './users.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { AuthModule } from 'src/auth/auth.module';
import { GroupsModule } from 'src/groups/groups.module';
import { Group } from 'src/groups/entities/group.entity';

@Module({
  providers: [UsersResolver, UsersService],
  imports: [
    TypeOrmModule.forFeature([User, Group]),
    forwardRef(() => AuthModule),
  ],
  exports: [UsersService],
})
export class UsersModule { }
