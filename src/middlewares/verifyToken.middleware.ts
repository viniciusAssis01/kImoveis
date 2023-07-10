import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";
import { AppError } from "../error";

export const verifyToken = (
    req: Request,
    res: Response,
    next: NextFunction
  ): void => {
    //console.log(req.params.id)
    const authorization: string | undefined | null = req.headers.authorization
    //estamos instanciando a const authorization, q vai fir do headers da requisição

    if(!authorization) throw new AppError("Missing bearer token", 401);

    const token: string = authorization.split(" ")[1];
    /* ou const [_bearer, token]: Array<string> = authorization.split(" ")
    desconstruindo o array, e estamos armazenando o 1ºelemento do arary na variavel "_bearer"...e assim vai
    se tiver token vamos ter q quebra-lo:
    qndo enviamos um token nao requisição ele vem da seguinte forma "bearer codigoTOken".
    mas temos q pegar só o codigo do TOKEN, temos q tirar esse termo "bearer".
    então vamos usar o método split(): qndo encrontrar espaço (entre termos) vai transformar em um array cujo nº de elementos vai ser a msm qntde de termos separados por espaço.
    o 1ºtermo vai ser salvo na 1º variavel dentro de []; e o 2ºtermo, na 2ºvariavel dentro de []...e assim vai
    */

    
    /* //antes estamos fazendo da seguinte forma
    verify(token, String(process.env.SECRET_KEY!), (err: any, decoded: any)=>{
        if(err) throw new AppError(err.message, 401)
        res.locals.decoded = decoded;
    }) 
    //ñ estamos fazendo mais assim, pois colocamos esse err (JsonWebToken na no erro global). estamos fazendo da seguinte forma agora    */
    res.locals = {
        ...res.locals, 
        decoded: verify(token, process.env.SECRET_KEY!)
    }
    //poderia ser res.locals.decoded = verify(token, process.env.SECRET_KEY!)
    /*PARA DESCRIPTOGRAFAR o token usamos o método.VERIFY() recebe 3 parametros:
    --token q vamos descriptografar
    --secretOrPublicKey: chave q foi usada para criptografar o token, no formato string. Se queremos descriptgrafar temos q usar a msm chave
    --options: vamos passar um arrow function. ela recebe 2 parametros:
        ---err
        --decoded
    */

    return next();
  }