import { Request, Response } from "express";
import * as S from "../services"
import * as I from "../interfaces"
import * as E from "../entities"

export const createUserController = async(req: Request, res: Response): Promise<Response> => {
    const user: I.TUserReturn = await S.createUserService(req.body);
    return res.status(201).json(user);
}

export const readAllUsersController = async(req: Request, res: Response): Promise<Response> => {
    const readAll: I.TUserReadAll = await S.readAllUsersService()

    return res.status(200).json(readAll)
}

export const updateUserController = async(req: Request, res: Response): Promise<Response> => {
    const payloadReqBody: I.TUserUpdate = req.body
    const foundUser: E.User = res.locals.user

    const userUpdate = await S.updateUserService(foundUser, payloadReqBody)

    return res.status(200).json(userUpdate)
}

export const deleteUserController = async(req: Request, res: Response): Promise<Response> => {
    
    await S.deleteUserService(res.locals.user)
    return res.status(204).json()
} 

/* export const createUserController = async(req: Request, res: Response): Promise<Response> => {
    
} */