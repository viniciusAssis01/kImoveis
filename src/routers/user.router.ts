import { Router } from "express";
import * as M from "../middlewares";
import * as S from "../schemas";
import * as C from "../controllers";

export const userRouter: Router = Router();

userRouter.post("",M.validateBody(S.userCreateSchema), M.verifyEmailUserExists, C.createUserController);

userRouter.get("", M.verifyToken, M.isAdmin, C.readAllUsersController)

userRouter.patch("/:id", M.verifyToken, M.verifyUserIdExists, M.isAdminOrOwner,  M.validateBody(S.userUpdateSchema), C.updateUserController)

userRouter.delete("/:id", M.verifyToken, M.verifyUserIdExists, M.isAdmin,  C.deleteUserController)
