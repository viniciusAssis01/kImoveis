import { z } from "zod";
import * as S from "./index";

export const realEstateSchema = z.object({
    id: z.number().positive(),
    value: z.number().positive().default(0).or(z.string()),
    size: z.number().int().positive().min(1),
    address: S.addressSchema,
    category: S.categorySchema,
    //z.number().positive().min(1)
    //antes estava categoryId, mas na entiti ñ tem essa coluna | no dbeaber tem 
    sold: z.boolean().default(false),    
    createdAt: z.string().or(z.date()),
    updatedAt: z.string().or(z.date()),
    //ceja q para tipar a coluna/propriedade ADDRESS no zod, podemos referenciar um outro schema
})
/* qndo usamos o .positive() estamos, implicitamente, dizendo q ele é obrigatorio?*/

/* tipamos o VALUE como sendo um numero ou uma string pq: se nº
inteiro: é considerado NUMBER
decimal: é considerado STRING 
leve isso em consideração na hora de tipar e validar. */

export const realEstateCreateSchema = realEstateSchema.omit({id: true,createdAt: true, updatedAt: true, address: true, category: true}).extend({address: S.addressCreateSchema, categoryId: z.number().int()})

export const readAllRealEstateSchemas = realEstateSchema.array()

