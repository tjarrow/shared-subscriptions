import { SubscriptionSlot } from "@core/models/subscription-slot.model";
import { SubscriptionPlan } from "@core/models/subscription-plan.model";

export interface SubscriptionOffer {
  id: number;
  plan: SubscriptionPlan;
  slots: SubscriptionSlot[]
  slotsCount: number;
  freeSlotsCount: number;
  status?: number;
}
