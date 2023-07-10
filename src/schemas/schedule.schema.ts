import { z } from "zod";
import * as S from "./index";

export const scheduleSchema = z.object({
  id: z.number(),
  date: z.date(),
  hour: z.string().nonempty(),
  userId: S.userSchema,
  realEstateId: z.number().min(1)
});

export const sheduleCreateSchema = scheduleSchema.omit({ id: true });

//export const scheduleReturnSchema = scheduleSchema

export const schedulesReadAllSchema = scheduleSchema.array();
