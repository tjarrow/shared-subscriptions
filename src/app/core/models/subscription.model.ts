import {SubscriptionSlot} from "@core/models/subscription-slot.model";

export interface Subscription { //commented fields should be moved to Offer model
  id: number;
  slot: SubscriptionSlot;
}
