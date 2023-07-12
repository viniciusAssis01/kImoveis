import { createCategoryController, readAllCategoriesController, readAllRealEstateCategoryController } from "./category.controller";
import { createRealEstateController, readAllRealEsatatesController as readAllRealEstatesController } from "./realEstate.controller";
import { createSessionController } from "./session.controllers";
import { createUserController, deleteUserController, readAllUsersController, updateUserController } from "./user.controller";


export {createUserController, createSessionController, readAllUsersController, updateUserController, deleteUserController,

createCategoryController, readAllCategoriesController,
readAllRealEstateCategoryController,

createRealEstateController,
readAllRealEstatesController as readAllRealEstatesController}