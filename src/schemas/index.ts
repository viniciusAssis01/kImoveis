import { addressCreateSchema, addressSchema } from "./address.schema"
import { categoryCreateSchema, categoryReadAllSchema, categoryRealEstateSchema, categorySchema } from "./category.schema"
import { realEstateSchema, realEstateCreateSchema, readAllRealEstateSchemas } from "./realState.schema"
import { scheduleSchema, schedulesReadAllSchema, sheduleCreateSchema } from "./schedule.schema"
import { sessionSchema } from "./session.schema"
import { userCreateSchema, userReadAllSchema, userReturnSchema, userScheduleSchema, userSchema, userUpdateSchema } from "./user.schema"

export{
    userSchema,
    userCreateSchema,
    userReturnSchema,
    userReadAllSchema,
    userUpdateSchema,
    userScheduleSchema,

    sessionSchema,

    scheduleSchema,
    sheduleCreateSchema,
    schedulesReadAllSchema,

    realEstateSchema,
    realEstateCreateSchema,
    readAllRealEstateSchemas,

    addressSchema,
    addressCreateSchema,

    categorySchema,
    categoryCreateSchema,
    categoryReadAllSchema,
    categoryRealEstateSchema
    
}