import { Cond } from "src/cond/entities/cond.entity";
import { ProjectComponent } from "src/project-components/entities/project-component.entity";
import { Project } from "src/projects/entities/project.entity";
import { Status } from "src/status/entities/status.entity";
import { User } from "src/users/entities/user.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Issue {
  @PrimaryGeneratedColumn()
  ID: number

  @ManyToOne(() => Project, project => project.Issues, { onDelete: "CASCADE", nullable: false })
  Project: Project

  @Column({ length: 10 })
  Key: string

  @Column()
  IssueType: string

  @ManyToOne(() => User, user => user.Assignee, { nullable: true, eager: true, cascade: true })
  Assignee?: User

  @ManyToOne(() => User, user => user.Issues, { nullable: true, eager: true, cascade: true })
  Author?: User

  @Column()
  Title: string

  @Column()
  Description?: string

  @ManyToMany(() => ProjectComponent, component => component.ID, { nullable: true, eager: true, cascade: true })
  @JoinTable({ name: "issues_componetns" })
  Components?: ProjectComponent[]

  @OneToOne(() => Cond, { lazy: true, cascade: true })
  @JoinColumn()
  visible: Cond

  @Column({ default: "Средний" })
  Priority: "Высокий" | "Средний" | "Низкий"

  @ManyToOne(() => Status, status => status.Issues, { eager: true, cascade: true })
  Status: Status

  @ManyToOne(() => Issue, issue => issue.ChildrenIssues, { nullable: true, lazy: true, })
  ParentIssue?: Issue

  @OneToMany(() => Issue, issue => issue.ParentIssue, { nullable: true, lazy: true, cascade: true })
  ChildrenIssues?: Issue[]

  @CreateDateColumn()
  Create: Date

  @UpdateDateColumn()
  Update?: Date

  @Column({ type: 'datetime', nullable: true })
  DueDate: Date
}
