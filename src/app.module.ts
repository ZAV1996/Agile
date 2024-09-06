import 'dotenv/config'
import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { ProjectsModule } from './projects/projects.module';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/entities/user.entity';
import { ConfigModule } from '@nestjs/config';
import { SmtpSendlerModule } from './smtp-sendler/smtp-sendler.module';
import { CryptoModule } from './crypto-module/crypto.module';
import { CryptoService } from './crypto-module/crypto.service';
import { SessionModule } from './session/session.module';
import { Session } from './session/entities/session.entity';
import { GroupsModule } from './groups/groups.module';
import { Project } from './projects/entities/project.entity';
import { ProjectComponentsModule } from './project-components/project-components.module';
import { ProjectComponent } from './project-components/entities/project-component.entity';
import { Group } from './groups/entities/group.entity';
import { WorkflowModule } from './workflow/workflow.module';
import { Cond } from './cond/entities/cond.entity';
import { Path } from './status-path/entities/path.entity';
import { Workflow } from './workflow/entities/workflow.entity';
import { InitModule } from './init/init.module';
import { StatusPathModule } from './status-path/status-path.module';
import { StatusModule } from './status/status.module';
import { CondModule } from './cond/cond.module';
import { Status } from './status/entities/status.entity';
import { IssuesModule } from './issues/issues.module';
import { Issue } from './issues/entities/issue.entity';

const HOST = process.env.HOST
const PORT = Number(process.env.PORT)
const USERNAME = process.env.USERNAME
const PASSWORD = process.env.PASSWORD
const DB = process.env.DB

@Module({
  imports: [
    ///////////////////////////////
    ConfigModule.forRoot(
      {
        envFilePath: '.env',
      }
    ),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: HOST,
      port: PORT,
      username: USERNAME,
      password: PASSWORD,
      database: DB,
      entities: [User, Session, Group, Project, ProjectComponent, Status, Cond, Workflow, Path, Issue],
      logging: false,
      cache: {
        type: "database",
        duration: 60000
      },
      synchronize: true, //В проде надо отключить чтобы ненароком не потерять данные

    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: true,
      path: "/api/",
      buildSchemaOptions: {
        dateScalarMode: "isoDate"
      }
    }),
    ///////////////////////////////
    AuthModule,
    UsersModule,
    ProjectsModule,
    GroupsModule,
    WorkflowModule,
    InitModule,
    StatusPathModule,
    StatusModule,
    CondModule,
    IssuesModule,
    ProjectComponentsModule
  ],
  providers: []
})
export class AppModule { }
