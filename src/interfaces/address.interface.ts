import { z } from "zod";
import * as S from "../schemas";
import { Repository } from "typeorm";
import { Address } from "../entities";

export type TAddress = z.infer<typeof S.addressSchema>

export type TAddressCreate =  z.infer<typeof S.addressCreateSchema>

export type TAddressRepo = Repository<Address>
