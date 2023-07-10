import { z } from "zod";
import * as S from "./index";

export const userSchema = z.object({
  id: z.number().positive(),
  name: z.string().max(45),
  email: z.string().max(50).email(),
  admin: z.boolean().default(false),
  password: z.string().max(120),
  createdAt: z.string().or(z.date()),
  updatedAt: z.string().or(z.date()),
  deletedAt: z.string().or(z.date()).nullable(),
  /* schedules: E.Schedule[] */
});

export const userCreateSchema = userSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
  deletedAt: true,
});

export const userReturnSchema = userSchema.omit({password: true});
export const userReadAllSchema = userReturnSchema.array();

export const userUpdateSchema = userCreateSchema.omit({admin: true}).partial();

export const userScheduleSchema = userReturnSchema.extend({
    schedules: S.scheduleSchema
})



//as coluans especiais estamos tipando como OU Z.DATE pq as colunas com tipo de dado DATE é tipado como string
//nullable: para descrever q essa coluna pode ser nula.
//nullish: fala q a coluna pode ser tanto nula qnto opcional
