import { Router } from "express";
import * as M from "../middlewares";
import * as S from "../schemas";
import * as C from "../controllers";

export const  realEstateRouter: Router = Router();

realEstateRouter.post("",M.validateBody(S.realEstateCreateSchema),M.verifyToken, M.isAdmin, C.createRealEstateController)

realEstateRouter.get("", C.readAllRealEsatatesController)
