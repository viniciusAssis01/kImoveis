import { z } from "zod";
import * as S from "../schemas";
import { DeepPartial, Repository } from "typeorm";
import { User } from "../entities";

export type TUser = z.infer<typeof S.userSchema>
export type TUserCreate = z.infer<typeof S.userCreateSchema>
export type TUserReadAll = z.infer<typeof S.userReadAllSchema>
export type TUserReturn = z.infer<typeof S.userReturnSchema>
export type TUserBodyUpdate = Omit< TUserCreate /* TUser */, "admin" >
/* export type TUserUpdate = DeepPartial<Omit<TUserCreate, "admin">>; */
export type TUserUpdate = DeepPartial<TUserBodyUpdate>;
export type TUserRepo = Repository<User>
//para q esse Repository?

export type TUserSchedule = z.infer<typeof S.userScheduleSchema>

/*usamos só DeepPartial qndo o campo/propriedade (do schema) for ".partial()"
 usamos o DEEPPARTIAL na INTERFACE | partial() usamos no SCHEMA
*/

//perceba q ñ estamos mais usando aqle "export type TRealUserResult = QueryResult<TUser>"