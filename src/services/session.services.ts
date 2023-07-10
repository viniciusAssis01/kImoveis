import "dotenv/config";
import { sign } from "jsonwebtoken";
import { compare } from "bcryptjs";
import { AppError } from "../error";
import * as I from "../interfaces";
import * as E from "../entities"
import * as repository from "../repositories"

export const createSessionService = async(
    {email, password}: I.TSessionCreate
): Promise<I.TSessionReturn> =>{
    const foundUser: E.User | null = await repository.userRepository.findOneBy({email: email})
    //poderiamos screver só email ao inves de "email:email"
    //console.log(foundUser)
    //console.log(password, foundUser?.password)

    if(!foundUser) throw new AppError("Invalid credentials", 401);

    const samePwd: boolean = await compare (password, foundUser.password);
    /* compare password (do corpo da req; dado de entrada) com a senha hasehada ja no DB
    esse compare vai hashear a string (1ºparametro) q ñ está hasheada e vai comparar com a string hasheada(2ºparametro) - comparação de hash
    */
    //console.log(samePwd);

    if(!samePwd) throw new AppError("Invalid credentials", 401);

    /* para criar o token (colocar as coisas [objeto com suas propreidades] dentro dele) usamos o método sign(), q recebe 3 parametros:
    --um objeto contendo os dados q vai ter dentro dele
    --uma chave para criptografar tudo q está dentro do token
    --um objeto q vai ter 2 chaves/propriedades: subject(identificador do q estamos arzaenando no token - é um id) e expiresIn(validade do token)
    */
    
    const token: string = sign(
        {name: foundUser.name, email: foundUser.email, admin: foundUser.admin},
        process.env.SECRET_KEY!,
        {subject: foundUser.id.toString(), expiresIn: process.env.EXPIRES_IN!}
    );
    //pq transformamos em string? a gente transforma em uma string pois tem q estar no formato json

    return {token};
}
