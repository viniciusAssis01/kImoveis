import * as S from "../schemas";
import * as I from "../interfaces";
import * as E from "../entities";
import { categoryRepository, realEstateRepository } from "../repositories";
import { AppError } from "../error";

export const createCategoryService = async(payloadReqBody: I.TCategoryCreate): Promise<I.TCategory> => {
    const nameCategory: string = payloadReqBody.name;

    const foundCategory: E.Category | null = await categoryRepository.findOneBy({name: nameCategory});

    if(foundCategory) throw new AppError("Category already exists", 409)
    
    const category: E.Category = categoryRepository.create(payloadReqBody);

    await categoryRepository.save(category)

    return S.categorySchema.parse(category)
}

export const readAllCategoryService = async():Promise<I.TCategoryReadAll> =>{
    const categories: (E.Category)[] = await categoryRepository.find()

    return S.categoryReadAllSchema.parse(categories)
}

export const readAllRealEstatesCategoryService =  async(categoryId: number): Promise<I.TCategoryRealEstateReadAll> =>{
    /* return S.categoryRealEstateSchema.parse(
        await categoryRepository.findOne ({where: {id: categoryId},
          relations: {}
        })
    ) */

    const realEstatesCategory: Array<E.RealEstate> = await realEstateRepository
        .createQueryBuilder("r")
        .innerJoinAndSelect("r.category", "c")
        .where("r.categoryId = :id", {id:  categoryId})
        .getMany();

    return S.categoryRealEstateSchema.parse(realEstatesCategory)
}