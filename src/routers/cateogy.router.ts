import { Router } from "express";
import * as M from "../middlewares";
import * as S from "../schemas";
import * as C from "../controllers";

export const categoryRouter: Router = Router();

categoryRouter.post("",M.verifyToken, M.isAdmin,C.createCategoryController)
categoryRouter.get("", C.readAllCategoriesController)
categoryRouter.get("/:id/realEstate", C.readAllRealEstateCategoryController)

//autenticação = tokin = login