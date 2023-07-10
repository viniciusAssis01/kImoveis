import { Request, Response } from "express";
import * as S from "../services"
import * as I from "../interfaces"
import * as E from "../entities"

export const createCategoryController = async(req: Request, res: Response): Promise<Response> => {
    const categoryCreate: I.TCategory = await S.createCategoryService(req.body)

    return res.status(201).json(categoryCreate)
}

export const readAllCategoriesController = async(req: Request, res: Response): Promise<Response> => {
    const readAll: I.TCategoryReadAll = await S.readAllCategoryService()

    return res.status(200).json(readAll)
}

export const readAllRealEstateCategoryController  = async(req: Request, res: Response): Promise<Response> => {
    const { id } = req.params
    const realEstatesCategory: any = S.readAllRealEstatesCategoryService(+id)
    /* esse + é para transformar em number.(+ = Number())
        se ñ tivessemos esse "+" teriamos q: desconstruir o id (do req. params: const {id} req.params) > armazenar numa variavel o id transformado em nubmer (cons id = Number(id))
    */
    return res.status(200).json(realEstatesCategory)
}

/* export const  = async(req: Request, res: Response): Promise<Response> => {

    return res.status().json()
} */