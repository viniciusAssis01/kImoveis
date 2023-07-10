import { getRounds, hashSync } from "bcryptjs";
import { BeforeInsert, BeforeUpdate, Column, CreateDateColumn, DeleteDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import * as E from "./index"
//por padrão, aqui na ENTITIES, o TYPEORM  coloca todas as colunas/campos da entity como NOT NULL

//repare q ñ colocamos a opção/propriedade (dentro do objeto passado como parametro do @decorator) type, na maioria das colunas, pois a tipagem ja faz isso para gente.

@Entity("users")
export class User{
  @PrimaryGeneratedColumn("increment")
  id: number;

  @Column({length: 45})
  name: string;

  @Column({length: 50, unique: true})
  email: string;

  @Column({default: false})
  admin: boolean;

  @Column({length: 120})
  password: string;

  @CreateDateColumn({ type: "date" })
  createdAt: string;

  @UpdateDateColumn({ type: "date" })
  updatedAt: string;

  @DeleteDateColumn({ type: "date" })
  deletedAt: string | null;

  @OneToMany(()=> E.Schedule, (schedules) => schedules.user)
  schedules: E.Schedule[]
  /* em @OneToMany, vamos declarar a coluna da tabela  (do outro lado da relação) q referencia essa tabela q estamos
  sempre q usarmos @OneToMany, ele vai esperar recber 2 parametros
  --1ºparametro) uma callback q retorna a class (da entity) do outro lado da relação
  --2ºparametro) uma callback q recebe como parametro "o nome da tabela do outro lado da relaçaõ"; e essa calback retorna a tabela.coluna q referencia (armazena o PK) dessa tabela q estamos
  */

  //para hashear a senha direto na entity, vamos usar os listeners..
  @BeforeInsert()
  @BeforeUpdate()
  //hashPassword() é um método do TYPEORM
  hashPassword(){
    const hasRounds: number = getRounds(this.password)
    /* a constante hasRounds serve para q? se deixarmos só “this.password = hashSync(this.password,10)” na atualização de dados, ele vai estar sempre hasheando a senha novamente. Mas quermeos q a senha seja hasheada apenas 1 vez. Dai usamos essa constante hasRound: verifico se a senha já foi hasheada. 
        quem verifica isso é o método getRounds (do bcryptjs). recebe como parametro o q será hasheado. retorna o nº de roundsman, q é o nºcontendo a quantidade de vezes q a senha foi hasheada
    qndo cai nesse if, significa q o retorno desse método é zero; e zero ≡  ao booleno FALSE (undefined, null, NaN, 0 ≡ false | 1 ≡ true) - por isso descrevemos como "!hasRounds"; Caso ela já tenha sido hasheada, ñ vamos hashear novamente.  */
    if(!hasRounds){
        this.password = hashSync(this.password, 10);
        //como parametro do método hashSync() passamos o q vai ser hasheado (no caso a coluna dessa tabela) e o nº de hasheamento (bom colocar entre 10 a 13)
        /*estamos usando o hashSync ao inves do "await hash". os métodos q vem depois dos LISTENERS, são métodos  q lidam mal com funções assincronas (então sempre q formos utilizar os LISTENERS e for colocar uma logica, nunca coloca assincrono; caso contrario pode dar erro – ñ use “await método”)  */
    }
  }
}


/*criar a tabela pivo automaticamente:
declarar o decorator  @ManyToMany em um lado da relação > nesse msm lado declarar a @JoinTable (q vai criar a tabela pivo) > abaixo dela vamos declarar a coluna q referencia (armazena o PK) da tabela do outro lado do relacionamento (sem ser a tabela pivo) - essa coluna após o @JointTable será o nome da nossa coluna da tabela Pivo (lembra q o TYPEORM coloca o sufixo id automaticamente). 
    Ao ver o resultado desses decorators, vc vai perceber q no @JoinTable vc tem q especificar uma coluna q irá armazenar a PK da outra tabela relacionada; e q tbm o @JoinTable, ao criar a tabela pivô, ele adiciona automaticamente (sem precisarmos criarmos) uma coluna (nessa tabela pivô) com o nome da tabela (em possui o @JoinTable) tabela+sufixoID”

*/