import { Selector } from "@ngxs/store";
import { SubscriptionState } from "@store/app/subscription.state";
import { SubscriptionsStateModel } from "@store/app/subscriptions.actions";
import { SubscriptionOffer } from "@core/models/subscription-offer.model";
import { Subscription } from "@core/models/subscription.model";

export class SubscriptionsGetterState {
  @Selector([SubscriptionState])
  static isSubscriptionsLoading(state: SubscriptionsStateModel): boolean {
    return state.isSubscriptionsLoading;
  }

  @Selector([SubscriptionState])
  static subscriptionsLoadedError(state: SubscriptionsStateModel): boolean {
    return state.subscriptionsLoadedError;
  }

  @Selector([SubscriptionState])
  static hasLoadedSubscriptions(state: SubscriptionsStateModel): boolean {
    return Boolean(state.subscriptions);
  }

  @Selector([SubscriptionState])
  static subscriptionsInfo(state: SubscriptionsStateModel): [SubscriptionOffer[], Subscription[]] {
    return [state.subscriptionOffers, state.subscriptions];
  }

  @Selector([SubscriptionState])
  static isSubscriptionsOffersLoading(state: SubscriptionsStateModel): boolean {
    return state.isSubscriptionOffersLoading;
  }

  @Selector([SubscriptionState])
  static subscriptionOffersLoadedError(state: SubscriptionsStateModel): boolean {
    return state.subscriptionOffersLoadedError;
  }

  @Selector([SubscriptionState])
  static hasLoadedOfferSubscriptions(state: SubscriptionsStateModel): boolean {
    return Boolean(state.subscriptionOffers);
  }

  @Selector([SubscriptionState])
  static subscriptionOffersInfo(state: SubscriptionsStateModel): SubscriptionOffer[] {
    return state.subscriptionOffers;
  }
}
