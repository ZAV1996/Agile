import { Status } from "src/status/entities/status.entity";
import { Entity, JoinTable, ManyToMany, OneToOne, PrimaryGeneratedColumn, Relation, } from "typeorm";

@Entity()
export class Path {
    @PrimaryGeneratedColumn()
    ID: number

    @ManyToMany(() => Status, status => status.ID, { nullable: true, cascade: true, lazy: true })
    @JoinTable({ name: "path_from" })
    from?: Status[]

    @ManyToMany(() => Status, status => status.ID, { nullable: true, cascade: true, lazy: true })
    @JoinTable({ name: "path_to" })
    to?: Status[]
}