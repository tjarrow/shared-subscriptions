import { Subscription } from "@core/models/subscription.model";
import { SubscriptionOffer } from "@core/models/subscription-offer.model";

export interface SubscriptionsStateModel {
  isSubscriptionsLoading: boolean;
  subscriptionsLoadedSuccess: boolean;
  subscriptionsLoadedError: any;
  subscriptions: Subscription[] | null;

  isSubscriptionOffersLoading: boolean;
  subscriptionOffersLoadedSuccess: boolean;
  subscriptionOffersLoadedError: any;
  subscriptionOffers: SubscriptionOffer[] | null;

  isSubscriptionOfferCancelling: boolean;
  subscriptionOfferCancelledSuccess: boolean;
  subscriptionOfferCancelledError: any;

  isSubscriptionCancelling: boolean;
  subscriptionCancelledSuccess: boolean;
  subscriptionCancelledError: any;
}

export class CancelOffer {
  static readonly type = '[App] CancelOffer';
  constructor(public payload: { offerId: number }) { }
}

export class CancelSubscription {
  static readonly type = '[App] CancelSubscription';
  constructor(public payload: { subscriptionId: number }) { }
}

export class GetSubscriptions {
  static readonly type = '[App] GetSubscriptions';
}

export class GetSubscriptionOffers {
  static readonly type = '[App] GetSubscriptionOffers';
}

