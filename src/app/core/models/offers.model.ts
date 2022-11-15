import { Plan } from './service.model';

export interface OfferService {
  id: number;
  name: string;
  description: string;
  logoId?: number
}

export interface OfferPlan extends Plan {
  service: OfferService;
}

export interface OfferOwner {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  userAvatarId?: number;
}

export interface Offer {
  id: string;
  createdDate: string;
  deletedDate: string;
  plan: OfferPlan;
  owner: OfferOwner;
  slotsCount: number;
  freeSlotsCount: number;
}
