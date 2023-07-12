import { z } from "zod";
import * as S from "./index";

export const addressSchema = z.object({
  id: z.number().positive(),
  street: z.string().max(45),
  zipCode: z.string().max(8),
  number: z.string().max(7).nullish(),
  //antes estava como nullable (e n nulish. nisso tivemos q adicionar na tipagem da coluna number [da entity address] o union type "| undefined" ->ja q estamos falando q pode ser nullo e opcional [opcional: ou seja, se ñ for passado vai ser do tipo indefinido])
  city: z.string().max(20).nonempty(),
  state: z.string().max(2).nonempty(),
})
/* nullish: descreve q pode ser nullo e opcional
   nullable: para descrever q pode ter valores nullos nessa coluna
ambos podem ser usados tanto no zod qnto na entyty (nas opções/propriedades do objeto passado como parametro do @decorators)
 */

//nonempty nao funciona para numeros. ai temos q usar o .min(1) para dizer q é obrigatorio

export const addressCreateSchema = addressSchema.omit({
    id: true,
})

/* export const addressRealestateSchema = addressSchema.extend({
    realEstate: S.realEstateSchema
}) */



