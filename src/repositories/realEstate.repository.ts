import { AppDataSource } from "../data-source";
import * as E from "../entities"
import * as I from "../interfaces"

export const realEstateRepository: I.TRealEstateRepo = AppDataSource.getRepository(E.RealEstate);