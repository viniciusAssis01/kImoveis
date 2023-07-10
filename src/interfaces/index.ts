import { TRealEstate, TRealEstateCreate, TRealEstateRepo, TReadAllRealEstates } from './realEstate.interfaces';
import { TAddress, TAddressCreate, TAddressRepo } from './address.interface';

import { TCategory, TCategoryRepo, TCategoryCreate, TCategoryReadAll, TCategoryRealEstateReadAll } from './category.interfaces';
import { TSessionReturn, TSessionCreate } from './session.interface';
import { TUserCreate, TUserReadAll, TUserReturn, TUserUpdate, TUserSchedule, TUserRepo } from './user.interfaces';



export {TUserCreate,
TUserReadAll,
TUserReturn,
TUserUpdate,
TUserRepo,
TUserSchedule,
TSessionCreate,
TSessionReturn,

TCategory,
TCategoryCreate,
TCategoryRepo,
TCategoryReadAll,
TCategoryRealEstateReadAll,

TRealEstate,
TRealEstateCreate,
TRealEstateRepo,
TReadAllRealEstates,

TAddress,
TAddressCreate,
TAddressRepo,
}