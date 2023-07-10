import { AppDataSource } from "../data-source";
import * as E from "../entities"
import * as I from "../interfaces"

export const categoryRepository: I.TCategoryRepo = AppDataSource.getRepository(E.Category)