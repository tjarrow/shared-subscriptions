export interface ServiceDto {
  id: number;
  name: string;
  description: string;
  logo?: { id: number };
  plans: PlanDto[];
  terms_link: string;
}

export interface PlanDto {
  id: number;
  name: string;
  description: string;
  max_slots: number;
  price: number;
  sellerSavingPrice: number;
  buyerCostPrice: number;
  fee: number;
}

export interface OfferServiceDto {
  id: number;
  name: string;
  description: string;
}

export interface OfferPlanDto extends PlanDto {
  service: OfferServiceDto;
}

export interface OfferOwnerDto {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  logo: { id: number, mimetype: string }
}

export interface OffersDto {
  id: string;
  created_date: string;
  deleted_date: string;
  plan: OfferPlanDto;
  owner: OfferOwnerDto;
  slotsCount: number;
  freeSlotsCount: number;
}

export interface PaymentHistoryDto {
  amount: number;
  created: number;
  currency: string;
  status: string;
  card_brand: string;
  card_last4: string;
}
