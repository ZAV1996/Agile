import { Module } from '@nestjs/common';
import { ProjectComponentsService } from './project-components.service';
import { ProjectComponentsResolver } from './project-components.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProjectComponent } from './entities/project-component.entity';
import { ProjectsModule } from 'src/projects/projects.module';

@Module({
  providers: [ProjectComponentsResolver, ProjectComponentsService],
  imports: [
    TypeOrmModule.forFeature([ProjectComponent]),
    ProjectsModule
  ],
  exports: [
    ProjectComponentsService
  ]
})
export class ProjectComponentsModule { }
