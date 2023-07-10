import { AppDataSource } from "../data-source";
import * as E from "../entities"
import * as I from "../interfaces"

export const userRepository: I.TUserRepo = AppDataSource.getRepository(E.User)
//export default AppDataSource.getRepository(User)
//pq ñ dá para fazer a importação normal?
//acho q teria q armazenar em uma variavel para exportarmos