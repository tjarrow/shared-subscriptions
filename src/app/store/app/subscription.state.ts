import { Action, NgxsOnInit, State, StateContext } from "@ngxs/store";
import {
  GetSubscriptions,
  CancelSubscription,
  CancelOffer,
  GetSubscriptionOffers,
  SubscriptionsStateModel } from './subscriptions.actions';
import { Injectable } from "@angular/core";
import { AppService } from "@shared/services/app/app.service";
import { tap } from "rxjs/operators";
import { SubscriptionDto } from "@store/app/subscription.dto";

@State<SubscriptionsStateModel>({
  name: 'subscription',
  defaults: {
    isSubscriptionsLoading: false,
    subscriptionsLoadedSuccess: false,
    subscriptionsLoadedError: null,
    subscriptions: null,

    isSubscriptionOffersLoading: false,
    subscriptionOffersLoadedSuccess: false,
    subscriptionOffersLoadedError: null,
    subscriptionOffers: null,

    isSubscriptionOfferCancelling: false,
    subscriptionOfferCancelledSuccess: false,
    subscriptionOfferCancelledError: null,

    isSubscriptionCancelling: false,
    subscriptionCancelledSuccess: false,
    subscriptionCancelledError: null,
  }

})

@Injectable()
export class SubscriptionState implements NgxsOnInit {
  constructor(private appService: AppService) { }

  ngxsOnInit(ctx: StateContext<SubscriptionsStateModel>) {}

  @Action(GetSubscriptions)
  getSubscriptions(ctx: StateContext<SubscriptionsStateModel>) {
    const subscriptions = ctx.getState().subscriptions;
    console.log('subscriptions: ', subscriptions)
    if (subscriptions) return;
    ctx.patchState({
      isSubscriptionsLoading: true,
      subscriptionsLoadedSuccess: false,
      subscriptionsLoadedError: null,
    });
    return this.appService.getOffersAndSubscriptions().pipe(
      tap((result: SubscriptionDto) => {
        const newSubscriptions = result.subscriptions.map(subscription => (
          {
            id: subscription.id,
            slot: subscription.slot
          }
        ));
        const newSubscriptionOffers = result.offers.map(offer => (
          {
            id: offer.id,
            slotsCount: offer.slotsCount,
            freeSlotsCount: offer.freeSlotsCount,
            plan: offer.plan,
            slots: offer.slots,
            status: offer.status
          }
        ));
        ctx.patchState({
          subscriptions: newSubscriptions,
          subscriptionOffers: newSubscriptionOffers,
          isSubscriptionsLoading: false,
          subscriptionsLoadedSuccess: true,
        });
      }, (err) => {
        ctx.patchState({
          subscriptionsLoadedError: err,
          isSubscriptionsLoading: false,
        });
      })
    )
  }

  @Action(GetSubscriptionOffers)
  GetSubscriptionOffers(ctx: StateContext<SubscriptionsStateModel>) {
    const subscriptionOffers = ctx.getState().subscriptionOffers;
    if (subscriptionOffers) return;
    ctx.patchState({
      isSubscriptionOffersLoading: true,
      subscriptionOffersLoadedSuccess: false,
      subscriptionOffersLoadedError: null,
    });
    return this.appService.getOffersAndSubscriptions().pipe(
      tap((result: SubscriptionDto) => {
        const newSubscriptionOffers = result.offers.map(offer => (
          {
            id: offer.id,
            slotsCount: offer.slotsCount,
            freeSlotsCount: offer.freeSlotsCount,
            plan: offer.plan,
            slots: offer.slots,
            status: offer.status
          }
        ));
        ctx.patchState({
          subscriptionOffers: newSubscriptionOffers,
          isSubscriptionOffersLoading: false,
          subscriptionOffersLoadedSuccess: true,
        });
      }, (err) => {
        ctx.patchState({
          subscriptionsLoadedError: err,
          isSubscriptionsLoading: false,
        });
      })
    )
  }

  @Action(CancelOffer)
  cancelOffer(ctx: StateContext<SubscriptionsStateModel>, action: CancelOffer) {
    ctx.patchState({
      isSubscriptionOfferCancelling: true,
      subscriptionOfferCancelledSuccess: false,
      subscriptionOfferCancelledError: null
    });
    return this.appService.cancelOffer(action.payload).pipe(
      tap(() => {
        ctx.patchState({
          isSubscriptionOfferCancelling: false,
          subscriptionOfferCancelledSuccess: true
        })
      }, (err) => {
        ctx.patchState({
          subscriptionOfferCancelledError: err,
          isSubscriptionOfferCancelling: false,
          subscriptionOfferCancelledSuccess: false,
        });
      })
    )
  }

  @Action(CancelSubscription)
  cancelSubscription(ctx: StateContext<SubscriptionsStateModel>, action: CancelSubscription) {
    ctx.patchState({
      isSubscriptionCancelling: true,
      subscriptionCancelledSuccess: false,
      subscriptionCancelledError: null
    });
    return this.appService.cancelSubscription(action.payload).pipe(
      tap(() => {
        ctx.patchState({
          isSubscriptionCancelling: false,
          subscriptionCancelledSuccess: true
        })
      }, (err) => {
        ctx.patchState({
          subscriptionCancelledError: err,
          isSubscriptionCancelling: false,
          subscriptionCancelledSuccess: false,
        });
      })
    )
  }
}
