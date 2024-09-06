import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Group } from 'src/groups/entities/group.entity';
import { Project } from 'src/projects/entities/project.entity';
import { Cond } from 'src/cond/entities/cond.entity';
import { Entity, PrimaryGeneratedColumn, Column, PrimaryColumn, Unique, CreateDateColumn, UpdateDateColumn, OneToMany, JoinTable, ManyToMany, ManyToOne } from "typeorm"
import { Issue } from 'src/issues/entities/issue.entity';
import { ProjectComponent } from 'src/project-components/entities/project-component.entity';

@ObjectType()
@Unique("user", ["email"])
@Entity()
export class User {
  @PrimaryGeneratedColumn()
  @Field(() => Int, { description: "Идернификатор пользователя" })
  ID: number

  @PrimaryColumn({ length: 50, nullable: false })
  @Field(() => String, { description: "Адрес электронной почты пользователя", nullable: true })
  email: string

  @Column({ type: "varchar", length: 50 })
  @Field(() => String, { description: "Имя пользователя", nullable: true })
  name: string

  @Column({ type: "varchar", length: 50 })
  @Field(() => String, { description: "Фамилия пользователя", nullable: true })
  surname: string

  @Column({ type: "varchar", length: 50 })
  @Field(() => String, { description: "Отчество пользователя", nullable: true })
  patronymic: string

  @Column({ type: "varchar", length: 250, nullable: true })
  @Field(() => String, { description: "Подразделение", nullable: true })
  department?: string

  @Column({ default: false, type: "boolean" })
  @Field(() => Boolean, { description: "Пользовательский статус", nullable: true })
  isActivated?: boolean

  @Column({ nullable: true, type: 'varchar', })
  activationToken?: string | null

  @Column({ type: 'varchar' })
  password: string

  @CreateDateColumn()
  @Field(() => Date, { description: "Дата регистрации пользователя", nullable: false })
  register_date: Date

  @UpdateDateColumn()
  @Field(() => Date, { description: "Дата последнего обновления пользователя", nullable: true })
  updated_date?: Date

  @ManyToMany(() => Group, (group) => group.users)
  groups: Group[];

  @OneToMany(() => Project, (project) => project.ID)
  projects: Project[]

  @OneToMany(() => Cond, (cond) => cond.users)
  cond: Cond[]

  @OneToMany(() => Issue, issue => issue.Author)
  Issues: Issue[]

  @OneToMany(() => Issue, issue => issue.Assignee)
  Assignee: Issue[]

  @OneToMany(() => ProjectComponent, component => component.owner)
  Components: ProjectComponent[]

  @OneToMany(() => ProjectComponent, component => component.defaultExecuter)
  ExecuteComponent: ProjectComponent[]
}