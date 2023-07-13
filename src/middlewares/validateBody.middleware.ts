import { NextFunction, Request, Response } from "express";
import { ZodTypeAny } from "zod";

export const validateBody =
  (schema: ZodTypeAny) =>
  (req: Request, res: Response, next: NextFunction): void => {
    req.body = schema.parse(req.body);
    //estamos REATRIBUINDO o valor de req.body - isso é permitido.
    console.log(req.body);
    return next();
};