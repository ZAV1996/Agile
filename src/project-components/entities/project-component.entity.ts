import { Issue } from "src/issues/entities/issue.entity";
import { Project } from "src/projects/entities/project.entity";
import { User } from "src/users/entities/user.entity";
import { Column, Entity, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class ProjectComponent {

  @PrimaryGeneratedColumn()
  ID: number

  @ManyToOne(() => Project, (project) => project.Components, { nullable: false })
  parent: Project

  @Column({ nullable: false })
  title: string

  @Column({ nullable: true })
  description: string

  @ManyToOne(() => User, (user) => user.Components, { nullable: true, cascade: true, eager: true })
  owner: User

  @ManyToOne(() => User, (user) => user.ExecuteComponent, { nullable: true, cascade: true, eager: true })
  defaultExecuter: User
}
