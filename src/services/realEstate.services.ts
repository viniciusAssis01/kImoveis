import * as I from "../interfaces";
import * as E from "../entities";
import { addressRepository, categoryRepository, realEstateRepository } from "../repositories";
import { AppError } from "../error";

export const createRealEstateService = async(payloadReqBody: I.TRealEstateCreate): Promise <I.TRealEstate> =>{

    const {address, categoryId, ...realEstateBody} = payloadReqBody

    //verify address exists (ñ vamos criar middleware pois só vai ser usado no método post dessa rota)
    const foundAddress: E.Address | null = await addressRepository.findOneBy({
        street: address.street,
        zipCode: address.zipCode,
        city: address.city,
        state: address.state,
        number: address.number || "",
        //estamos usando o nummber assim pq lembra q lá no schema o number é opcional
    })
    if(foundAddress) throw new AppError("Address already exists", 409);

    //verify categoryId existis(ñ vamos criar middleware pois só vai ser usado no método post dessa rota)
    const foundCategoryId: E.Category | null = await categoryRepository.findOneBy({
        id: Number(categoryId)
    });
    if(!foundCategoryId) throw new AppError("Category not found", 404);
    //esse throw new AppError poderia estar dentro da {} mas ae teriamos q usar o termo return antes de declarar ele

    const addressCreate: E.Address = addressRepository.create(address);
    //se vc for no schema do address e tipar a coluna/propriedade NUMBER como NULLISH, nesse address vai dar um erro de SOBRECARGA DEEPPARTIAL (significa erro de SCHEMA e/ou ENTITY)
    await addressRepository.save(addressCreate)

    const realEstateCreate: E.RealEstate = realEstateRepository.create({
        ...realEstateBody,
        address: addressCreate,
        category: foundCategoryId
        //se nomearmos a coluna/propriedade como CATEGORYID, vai acusar erro pq se irmos em nossa respectiva ENTITY veremos q ela ñ possui a coluna/propriedade com esse identificador/nome, mas sim a coluna/propriedade category
    });
    /* se no create passassemos apenas o REALESTATEBODY, ele acusaria erro de q está faltando algumas propriedade parar criar essa query, como ID, CREATEat...
        por isso vamos pssar os campos q criamos e campos q dessestruturamos do parametro da função
    */
    
    await realEstateRepository.save(realEstateCreate);

    return realEstateCreate
}

export const readAllRealEstateService = async(): Promise <I.TReadAllRealEstates> =>{
    const realEstates: Array<E.RealEstate> = await realEstateRepository.find({
        relations: {address: true}
    })

    return realEstates;
    //return S.readAllRealEstateSchemas.parse(realEstates)
}