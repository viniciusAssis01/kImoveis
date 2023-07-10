import { NextFunction, Request, Response } from "express";
import { AppError } from "../error";
import { User } from "../entities";
import * as repository from "../repositories";

export const verifyEmailUserExists = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
    const email: string = req.body.email;
    if(!email) return next();
    //pq faz essa condicional?

    const foundEmail: User | null = await repository.userRepository.findOneBy({email: email});
    //poderiamos escrever essa chave e o valor (do objeto passado como parametro do findOneBy) como: { email} -> pois a chave/propriedade EMAIl (da nossa entity) tem o msm nome do valor EMAIL (q vem do corpo da requisição), logo podemos escrever assim - se fossem nomes diferentes nao poderiamos escrever assim.

    if(foundEmail) throw new AppError("Email already exists", 409);

    return next();
};
