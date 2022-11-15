export enum SlotStatus {
  Pending = 1,
  Active = 2,
  Cancelled = 3,
  OnHold = 4
}

export interface PlanServiceDto {
  id: number;
  name: string;
  description: string;
  deleter_date: string | null;
  terms_link: string | null;
  logoId?: number;
}

export interface SubscriptionPlanDto {
  id: number;
  name: string;
  description: string;
  max_slots: number;
  price: number;
  fee: number;
  created_date: string;
  buyerCostPrice: number;
  sellerSavingPrice: number;
  deleted_date: string | null;
  service: PlanServiceDto;
}

export interface BuyerDto {
  id: number;
  email: string;
  created_date: string;
  first_name: string;
  last_name: string;
  is_confirmed: boolean;
  user_type: number;
  deleted_date: string | null;
  logo_url: string | null;
  logo: {id: number} | null;
}

export interface BaseSlotDto {
  id: number;
  status: number;
  created_date: string | null;
  deleted_date: string | null;
  productId: string;
  priceId: string;
}

export interface SharedOfferDto {
  id: number;
  slotsCount: number;
  freeSlotsCount: number;
  plan: SubscriptionPlanDto;
  slots: SubscriptionSlotDto[];
  status: SlotStatus;
}

export interface SubscriptionSlotDto extends BaseSlotDto {
  buyer: BuyerDto | null
}

export interface OfferDetailsDto {
  id: number;
  created_date: string;
  deleted_date: string;
  owner: BuyerDto;
  slots: SubscriptionSlotDto[];
  plan: SubscriptionPlanDto;
  slotsCount: number;
  freeSlotsCount: number;
}

export interface OfferSlotDto extends BaseSlotDto {
  id: number;
  offer: OfferDetailsDto;
  offerId: number;
  status: SlotStatus;
}

export interface SubscribedOfferDto {
  id: number;
  slot: OfferSlotDto;
}

export interface SubscriptionDto {
  offers: SharedOfferDto[];
  subscriptions: SubscribedOfferDto[];
}
