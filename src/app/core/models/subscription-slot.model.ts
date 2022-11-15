import { SubscriptionBuyer } from "@core/models/subscription-buyer.model";
import {SubscriptionOffer} from "@core/models/subscription-offer.model";

export interface SubscriptionSlot {
  offer?: SubscriptionOffer;
  id: number;
  offerId?: number;
  buyerId?: number;
  prevStatus?: number;
  status: number;
  buyer?: SubscriptionBuyer
}
