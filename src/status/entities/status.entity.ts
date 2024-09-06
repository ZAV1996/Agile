import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Workflow } from "src/workflow/entities/workflow.entity";
import { Cond } from "src/cond/entities/cond.entity";
import { Path } from "src/status-path/entities/path.entity";
import { Issue } from "src/issues/entities/issue.entity";

@Entity()
export class Status {
    @PrimaryGeneratedColumn()
    ID?: number

    @ManyToOne(() => Workflow, (workflow) => workflow.statuses, { onDelete: "CASCADE", nullable: false })
    parent?: Workflow

    @Column({ nullable: true })
    title?: string

    @OneToOne(() => Cond, { cascade: true, eager: true, nullable: true })
    @JoinColumn()
    cond?: Cond

    @OneToOne(() => Path, { cascade: true, eager: true, nullable: true })
    @JoinColumn()
    path?: Path

    @OneToMany(() => Issue, issue => issue.Status, { nullable: true })
    Issues?: Issue[]
}