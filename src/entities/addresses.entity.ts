import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import * as E from "./index"

@Entity("addresses")
export class Address{
  @PrimaryGeneratedColumn("increment")
  id: number;

  @Column({length: 45})
  street: string;

  @Column({length: 8})
  zipCode: string;

  @Column({type:"varchar",length: 7, nullable: true})
  number: string | null | undefined;
  //qndo é "string | null" temos q definir a opção "type" no {} do decorator |
  //acho q ao passar o nullable, temos q usar a opção/propriedade "default: null"
  //na verdade nao, se ñ passar nada nesse campo, ele vai assumir null (assim usar a opção "default: null" fica redundante)

  @Column({length: 20})
  city: string;

  @Column({length: 2})
  state: string;

  @OneToOne(()=> E.RealEstate, (realEstate) => realEstate.address)
  realEstate: E.RealEstate;
  //tirar esse decorator 1:1

}
//se tem a opção/propriedade (dentro do objeto passado como parametro do decorator): é string