import { forwardRef, Module } from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { ProjectsResolver } from './projects.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Project } from './entities/project.entity';
import { UsersModule } from 'src/users/users.module';
import { AuthModule } from 'src/auth/auth.module';
import { WorkflowModule } from 'src/workflow/workflow.module';

@Module({
  providers: [ProjectsResolver, ProjectsService],
  imports: [
    TypeOrmModule.forFeature([Project]),
    forwardRef(() => AuthModule),
    forwardRef(() => UsersModule),
    WorkflowModule,
  ],
  exports: [ProjectsService],
})
export class ProjectsModule { }
