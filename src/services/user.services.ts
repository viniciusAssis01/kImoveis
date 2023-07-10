import * as S from "../schemas";
import * as I from "../interfaces";
import * as E from "../entities";
import {userRepository} from "../repositories";

export const createUserService = async(payload: I.TUserCreate): Promise<I.TUserReturn> =>{
    const user: E.User =  userRepository.create(payload);
    //crie a "query" para criar um usuario nessa entity/tabela

    await userRepository.save(user);
    //salvar o usuario nessa entity

    return S.userReturnSchema.parse(user)
    /* leia da ESQ/DIR: analise se os dados de entrada(USER) está vindo conforme o schema... */
    //quero q vc pegue os dados de entrada (user) ANALISE e VALIDE para que o RETORNO seja conforme o SCHEMA - isso é PARSEAR/SERIALIZAÇÃO (TRATAR O Q VAI SER RETORNADO)
    //o parse vai validar se todas as chaves/propriedades estão vindo conforme o schema. As chaves/propriedades q ñ estiverem no SCHEMA, ele vai ignorar

    /* o hash de senha estava sendo retornado pq vc ñ está especificando o retorno
    por padrão qndo ñ especificamos o q deve ser retornado, ele retorna tudo q veio no corpo da requisição. 
    */
}

export const readAllUsersService = async(): Promise<I.TUserReadAll> =>{
    const users: Array<E.User> = await userRepository.find({withDeleted: true})
    return S.userReadAllSchema.parse(users)
}

export const updateUserService = async(user: E.User, payloadReqBody: I.TUserUpdate): Promise<I.TUserReturn>  =>{ 
     
    const updateUser: E.User = await userRepository.save({...user,...payloadReqBody})

    return S.userReturnSchema.parse(updateUser)
}

export const deleteUserService = async(user: E.User): Promise<void> =>{
    await userRepository.softRemove(user);
}

