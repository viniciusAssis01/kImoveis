import { z } from "zod";
import * as S from "../schemas";
import { Repository } from "typeorm";
import { RealEstate } from "../entities";

export type TRealEstate = z.infer<typeof S.realEstateSchema>

export type TRealEstateCreate = z.infer<typeof S.realEstateCreateSchema>

export type TReadAllRealEstates = z.infer<typeof S.readAllRealEstateSchemas>

export type TRealEstateRepo = Repository<RealEstate>