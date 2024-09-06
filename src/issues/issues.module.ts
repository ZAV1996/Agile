import { Module } from '@nestjs/common';
import { IssuesService } from './issues.service';
import { IssuesResolver } from './issues.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Issue } from './entities/issue.entity';
import { ProjectsModule } from 'src/projects/projects.module';

@Module({
  providers: [IssuesResolver, IssuesService],
  imports: [
    TypeOrmModule.forFeature([Issue]),
    ProjectsModule
  ],
  exports: [
    IssuesService
  ]
})
export class IssuesModule { }
