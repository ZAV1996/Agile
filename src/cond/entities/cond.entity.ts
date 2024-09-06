import { Column, Entity, JoinTable, ManyToMany, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Group } from "src/groups/entities/group.entity";
import { User } from "src/users/entities/user.entity";

@Entity()
export class Cond {
    @PrimaryGeneratedColumn()
    ID: number

    @ManyToMany(() => Group, (group) => group.ID, { cascade: true, eager: true })
    @JoinTable({ name: "conds_groups" })
    groups?: Group[]

    @ManyToMany(() => User, (user) => user.ID, { cascade: true, eager: true })
    @JoinTable({ name: "conds_users" })
    users?: User[]

    @Column({ type: "boolean", nullable: false, default: true })
    author?: boolean

    @Column({ type: "boolean", nullable: false, default: true })
    asignee?: boolean
}