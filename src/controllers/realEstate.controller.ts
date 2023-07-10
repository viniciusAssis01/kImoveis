import { Request, Response } from "express";
import * as S from "../services"
import * as I from "../interfaces"
import * as E from "../entities"

export const createRealEstateController = async(req: Request, res: Response): Promise<Response> => {
    //const {address,...realEstateBody} = req.body - melhor fazer essa dessestruturação na função.
    const realEstate: I.TRealEstate = await S.createRealEstateService( req.body)
    return res.status(201).json(realEstate)
}

export const readAllRealEsatatesController = async (req: Request, res: Response): Promise<Response> =>{
    const readAll: I.TReadAllRealEstates = await S.readAllRealEstateService()

    return res.status(200).json(readAll)
}