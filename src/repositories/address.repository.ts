import { AppDataSource } from "../data-source";
import * as E from "../entities"
import * as I from "../interfaces"

export const addressRepository: I.TAddressRepo = AppDataSource.getRepository(E.Address)
