import { forwardRef, Module } from '@nestjs/common';
import { GroupsService } from './groups.service';
import { GroupsResolver } from './groups.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from 'src/users/users.module';
import { AuthModule } from 'src/auth/auth.module';
import { Group } from './entities/group.entity';

@Module({
  providers: [GroupsResolver, GroupsService],
  imports: [
    TypeOrmModule.forFeature([Group]),
    forwardRef(() => AuthModule),
    forwardRef(() => UsersModule),
  ],
  exports: [GroupsService]
})
export class GroupsModule { }
