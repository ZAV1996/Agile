import { Project } from 'src/projects/entities/project.entity';
import { Status } from 'src/status/entities/status.entity';
import { Column, CreateDateColumn, Entity, ManyToMany, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn, } from 'typeorm';

@Entity()
export class Workflow {
  @PrimaryGeneratedColumn()
  ID!: number;

  @OneToMany(() => Project, project => project.Workflow)
  parent: [Project]

  @Column({ type: "varchar", length: 200, nullable: false })
  title: string

  @OneToMany(() => Status, (status) => status.parent, { cascade: true, eager: true })
  statuses: Status[]

  @Column({ nullable: true })
  description: string

  @CreateDateColumn()
  create_date: Date

  @UpdateDateColumn()
  update_date?: Date
}
