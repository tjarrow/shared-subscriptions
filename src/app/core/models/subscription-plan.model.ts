import { OfferService } from "@core/models/offers.model";

export interface SubscriptionPlan {
  id: number;
  name: string;
  description: string;
  max_slots: number;
  price: number;
  sellerSavingPrice: number;
  buyerCostPrice: number;
  fee: number;
  service: OfferService
}
