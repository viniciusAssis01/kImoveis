import { NextFunction, Request, Response } from "express";
import { AppError } from "../error";

export const isAdminOrOwner = (
    req: Request,
    res: Response,
    next: NextFunction
  ): void => {
    const {admin, sub} = res.locals.decoded;
    const {id} = req.params;

    if(admin) return next();

    if(Number(sub) !== Number(id)){
        throw new AppError("Insufficient permission", 403)
    }

    return next();
  }

