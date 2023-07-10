import { z } from "zod";
import * as S from "../schemas";
import { Repository } from "typeorm";
import { Category } from "../entities";

export type TCategory = z.infer<typeof S.categorySchema>

export type TCategoryCreate = z.infer<typeof S.categoryCreateSchema>

export type TCategoryReadAll = z.infer<typeof S.categoryReadAllSchema>

export type TCategoryRealEstateReadAll = z.infer<typeof S.categoryRealEstateSchema>

export type TCategoryRepo = Repository<Category>