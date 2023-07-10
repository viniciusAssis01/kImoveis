import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import * as E from "./index"

@Entity("categories")
export class Category{
  @PrimaryGeneratedColumn("increment")
  id: number;

  @Column({length: 45, unique: true})
  name: string;

  @OneToMany(()=> E.RealEstate, (realEstate)=> realEstate.category)
  realEstate: E.RealEstate[]
}
//O decorator @oneToMany/ManyToOne sempre espera 2 parametros | os demais espera obrigatoriamente só 1. 