import { Issue } from 'src/issues/entities/issue.entity';
import { ProjectComponent } from 'src/project-components/entities/project-component.entity';
import { User } from 'src/users/entities/user.entity';
import { Workflow } from 'src/workflow/entities/workflow.entity';
import { Entity, PrimaryGeneratedColumn, Column, PrimaryColumn, ManyToOne, CreateDateColumn, UpdateDateColumn, Unique, Index, JoinTable, OneToOne, ManyToMany, OneToMany } from "typeorm"

@Unique("project", ["Key"])
@Entity()
export class Project {
  @PrimaryGeneratedColumn()
  ID: number;

  @Column()
  ProjectName: string;

  @Column({ type: "varchar", length: 500, nullable: true })
  Description: string;

  @ManyToOne(() => User, (user) => user.ID, { nullable: false })
  Lead: User

  @Index()
  @Column({ length: 10, nullable: false })
  Key: string

  @Column({ type: "varchar", nullable: true })
  Image: string

  @CreateDateColumn()
  create_date: Date

  @UpdateDateColumn()
  update_date: Date

  @OneToMany(() => ProjectComponent, component => component.parent, { cascade: true, eager: true })
  Components: ProjectComponent[]

  @ManyToOne(() => Workflow, (workflow) => workflow.parent, { cascade: true, eager: true })
  Workflow: Workflow

  @OneToMany(() => Issue, issue => issue.Project, { nullable: true, cascade: true, eager: true })
  Issues: Issue[]
}
