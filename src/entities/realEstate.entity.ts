import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import * as E from "./index"
//essa class é o nome da nossa entidade 
// essa string passada como parametro do decorartor @Entity: é o nome da nossa tabela no DB
@Entity("real_estate")
export class RealEstate{
    @PrimaryGeneratedColumn("increment")
    id: number;

    @Column({default: false})
    sold: boolean;

    @Column({type: "decimal", precision: 12, scale: 2, default: 0})
    value: number | string;

    @Column({type: "integer"})
    size: number

    @CreateDateColumn({ type: "date" })
    createdAt: string;
    //nessas colunas especiais colcar 

    @UpdateDateColumn({ type: "date" })
    updatedAt: string;

    @OneToOne(()=>E.Address, (addresses)=>addresses.realEstate)
    @JoinColumn()
    address: E.Address;

    @ManyToOne(()=>E.Category, (category)=>category.id)
    @JoinColumn()
    category: E.Category;
    //o joinColumn vai colocar o sufixo Id no nome da coluna lá no DB, mas aqui ele fica com esse nome
    //sem ou com o JOINcolum acho q dá na msm

    @OneToMany(()=>E.Schedule, (schedules)=>schedules.realEstate)
    schedules: E.Schedule[];
}

/* 
  bidirecional:
  qndo precisa acessar as inf de ambos os lados (precisa)  - qndo  necessita/pede um get q traga inf de ambos os lados.
*/

/* qndo a opção type é "decimal" precisamos usar outras 2 opções/propriedades
a opção "precision" descreve a quantidade de casas apos a virgula
opção "scale": qntde de casas apos a virgula (casas decimais) */

/* qndo o tipo (seguindo a DER) da coluna é varchar (string em si), ñ precisamos colocar a opção/propriedade (do obj passado como parametro do decorator) "type: varchar".    mas se for tipo numerico, o tipo text precisamos

isso para aqla regra lembra: de tentar colocar o valor da opção/propriedade "type" de uma forma q o valor seja universal () para todas SQL.
  pois o typo varchar só tem no postggreSQL (nos outros SQL é descrito como outro tipo): logo ñ descrvemos o tipo de valor na coluna, a tipagem ja vai fazer isso para nós.
*/