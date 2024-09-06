import { Module } from '@nestjs/common';
import { WorkflowService } from './workflow.service';
import { WorkflowResolver } from './workflow.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Workflow } from './entities/workflow.entity';
import { GroupsModule } from 'src/groups/groups.module';
import { StatusModule } from 'src/status/status.module';
import { StatusPathModule } from 'src/status-path/status-path.module';
import { CondModule } from 'src/cond/cond.module';

@Module({
  providers: [WorkflowResolver, WorkflowService],
  imports: [
    TypeOrmModule.forFeature([Workflow]),
    GroupsModule,
    StatusModule,
    StatusPathModule,
    CondModule
  ],
  exports: [
    WorkflowService
  ]
})
export class WorkflowModule { }
