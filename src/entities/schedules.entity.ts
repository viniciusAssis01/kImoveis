import { Column, Entity, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import * as E from "./index"

@Entity("schedules")
export class Schedule {
    @PrimaryGeneratedColumn("increment")
    id: number;

    @Column({type: "date"})
    date: string;

    @Column({type: "time"})
    hour: string;

    @ManyToOne(() => E.RealEstate, (realEstate)=>realEstate.schedules)
    realEstate: E.RealEstate;

    @ManyToOne(() => E.User, (users)=>users.schedules)
    user: E.User;

}

//type "time" é tipado como string (assim com Date tbm é)