import { z } from "zod";
import * as S from "../schemas"

export const categorySchema = z.object({
  id: z.number().positive(),
  name: z.string().max(45).nonempty()
})

export const categoryCreateSchema = categorySchema.omit({
    id: true
})

export const categoryRealEstateSchema = categoryCreateSchema.extend({
  realEstates: S.readAllRealEstateSchemas
})

export const categoryReadAllSchema = categorySchema.array();



//nao passamos o tipo "unique aqui no schema do zod"
