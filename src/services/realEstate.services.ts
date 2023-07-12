import { realEstateSchema } from './../schemas/realState.schema';
import * as I from "../interfaces";
import * as E from "../entities";
import * as S from "../schemas"
import { addressRepository, categoryRepository, realEstateRepository } from "../repositories";
import { AppError } from "../error";

export const createRealEstateService = async(payloadReqBody: I.TRealEstateCreate): Promise <I.TRealEstate> =>{

    const {address, categoryId, ...realEstateBody} = payloadReqBody
    //antes estava categoryId

    //verify address exists (ñ vamos criar middleware pois só vai ser usado no método post dessa rota)
    const foundAddress: E.Address | null = await addressRepository.findOneBy({
        street: address.street,
        zipCode: address.zipCode,
        city: address.city,
        state: address.state,
        number: address.number || "",
        //estamos usando o nummber assim pq lembra q lá no schema o number é opcional (ou seja, pode ser passado ou ñ [se ñ cai como undefined])
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

    return realEstateCreate;
    //return S.realEstateSchema.parse(realEstateCreate)

    /* se retornassemos diretamente o REALESTATECREATE estaria acusando erro.  pois tipamos essa função como I.TRealEstate (e essa tipagem vem do schema realEstateSchema)  - o msm problema ocorre na função abaixo dessa, a READALLREALESTATESERVICE
        para nao dar o erro a gente uso o schema (para fazer a serialização) do RETURN
    outra coisa q poderiamos fazer é tipar essa função como a entity (class da entity) RealEstate.

    ae vc se pergunta "mas o schema nao é feito com base na Entity? nao sao as msm coisa?" sim o schema foi criado com base na entity, porem nao sao as msm coisas. qndo tipamos na entity estamos dizendo q aqle dado é uma ENTIDADE. ja qndo tipamos schema estamos dizendo q é um OBJETO - viu, tipos de dados diferentes.
       mas ai vc faz outra pergunta "mas no Js tudo ñ é objeto?" sim tudo é objeto.
       mas na ENTITY só a instancia (class) dela q é considerada um objeto -  ela em si é considerada uma ENTIDADE.
       (INSTANCIA = qndo vc inicializa uma classe)

    entendimento:
    sempre q tipar a função como base em um SCHEMA (como uma Interface q é criada com base em um schema) tenho q usar esse schema para serializar o RETURN dessa função
    
    entendimento novo: ACHO Q ISSO TUDO AI EM CIMA ESTÁ ERRADO, POIS NA TIPAGEM ESTAVA FALTANDO OMITIR 2 CAMPOS. aquela minha ideia está certa de q o schema é criado com base na entity, logo sao praticamente a msm coisa. tanto é q se retornar o REALESTATECREATE diretamente ou SERIALIZADO (com auxilio do schema) em ambos ñ vai acusar erro.
    */
}

export const readAllRealEstateService = async(): Promise <I.TReadAllRealEstates> =>{
    const realEstates: Array<E.RealEstate> = await realEstateRepository.find({
        relations: {address: true}
    })

    return S.readAllRealEstateSchemas.parse(realEstates);
}