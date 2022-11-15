import { Action, State, StateContext, NgxsOnInit } from '@ngxs/store';
import { Injectable } from '@angular/core';
import { take, tap } from 'rxjs/operators';
import {
  AppStateModel,
  GetServices,
  CreateOffer,
  ClearOfferCreationState,
  GetOffers,
  GetOfferById,
  CreateSubscription,
  ClearSubscriptionCreationState,
  ShowSupportForm,
  CloseSupportForm,
  GetSupport,
  ClearGettingSupportState,
  NotifyUser,
  HideNotification,
  HideAllNotifications,
  GetPaymentHistory,
  ClearPaymentHistoryState,
  CancelPaymentIntent,
  GetPaymentSource,
  ChangePaymentSource,
  SaveOfferDetails,
  CheckSavedOffer
} from './app.actions';
import { TokenExpired } from '../auth/auth.actions';
import { Service } from '@core/models/service.model';
import { Offer } from '@core/models/offers.model'
import { ServiceDto, OffersDto, PaymentHistoryDto } from './app.dto';
import { AppService } from '@shared/services/app/app.service';
import { of, iif } from "rxjs";
import { CardBrand, CardBrandFileName } from '@core/models/payment-history-item.model';
import { ModalPath } from '@core/modal/modal-routes.model';
import { ModalService } from '@shared/services/modal/modal.service';

@State<AppStateModel>({
  name: 'app',
  defaults: {
    isServicesLoading: false,
    servicesLoadedSuccess: false,
    servicesLoadedError: null,
    services: null,

    isOfferCreating: false,
    offerCreatedSuccess: false,
    offerCreatedError: null,

    isOffersLoading: false,
    offersLoadedSuccess: false,
    offersLoadedError: null,
    offers: null,
    isSubscribeLoading: false,
    subscribedError: null,
    subscriptionSessionId: '',

    notifications: [],

    isSupportFormShown: false,
    isSupportRequesting: false,
    supportRequestedSuccess: false,
    supportRequestedError: null,

    paymentHistory: [],
    isPaymentHistoryLoading: false,
    paymentHistoryError: null,

    paymentSource: undefined,
    demoOfferRequest: undefined
  }
})

@Injectable()
export class AppState implements NgxsOnInit {
  private notificationKey: number = 0;

  constructor(private appService: AppService, private modalService: ModalService) { }

  ngxsOnInit(ctx: StateContext<AppStateModel>) {

  }

  @Action(GetServices)
  getServices(ctx: StateContext<AppStateModel>) {
    const services = ctx.getState().services;
    if (services) return;
    ctx.patchState({
      isServicesLoading: true,
      servicesLoadedSuccess: false,
      servicesLoadedError: null,
    });
    return this.appService.getServices().pipe(
      tap((result: ServiceDto[]) => {
        const newServices: Service[] = result.map(service => (
          {
            id: service.id,
            name: service.name,
            description: service.description,
            logo: service.logo,
            terms_link: service.terms_link,
            plans: service.plans.map(plan => ({
              id: plan.id,
              name: plan.name,
              description: plan.description,
              maxSlots: plan.max_slots,
              price: plan.price,
              sellerSavingPrice: plan.sellerSavingPrice,
              buyerCostPrice: plan.buyerCostPrice,
              fee: plan.fee
            }))
          }
        ));

        ctx.patchState({
          services: newServices,
          isServicesLoading: false,
          servicesLoadedSuccess: true,
        });
      }, (err) => {
        ctx.patchState({
          servicesLoadedError: err,
          isServicesLoading: false,
        });
      })
    );
  }

  @Action(CreateOffer)
  createOffer(ctx: StateContext<AppStateModel>, action: CreateOffer) {
    ctx.patchState({
      isOfferCreating: true,
      offerCreatedSuccess: false,
      offerCreatedError: null,
      demoOfferRequest: undefined
    });
    return this.appService.postOffer(action.payload).pipe(
      tap((result: { id: number }) => {
        ctx.patchState({
          isOfferCreating: false,
          offerCreatedSuccess: true
        });
      }, (err) => {
        ctx.patchState({
          offerCreatedError: err,
          isOfferCreating: false,
          offerCreatedSuccess: false,
        });

        if (err && err.error && err.error.statusCode == 401) {
          ctx.dispatch(new TokenExpired());
        }
      })
    );
  }

  @Action(ClearOfferCreationState)
  clearOfferCreationState(ctx: StateContext<AppStateModel>) {
    ctx.patchState({
      isOfferCreating: false,
      offerCreatedSuccess: false,
      offerCreatedError: null,
    });
    return of(null);
  }

  @Action(GetOffers)
  getOffers(ctx: StateContext<AppStateModel>, action: GetOffers) {
    const offers = ctx.getState().offers;
    // if (offers) return;
    // TODO Prepare realization of right cache. Every subscription id plan group should be cached

    ctx.patchState({
      isOffersLoading: true,
      offersLoadedSuccess: false,
      offersLoadedError: null,
    });
    return this.appService.getOffers(action.payload).pipe(
      tap((result: OffersDto[]) => {
        const newOffers: Offer[] = result.map(this.mapOffer);

        ctx.patchState({
          offers: newOffers,
          isOffersLoading: false,
          offersLoadedSuccess: true,
        });
      }, (err) => {
        ctx.patchState({
          servicesLoadedError: err,
          offersLoadedError: false,
        });

        if (err && err.error && err.error.statusCode == 401) {
          ctx.dispatch(new TokenExpired());
        }
      })
    );
  }

  @Action(GetOfferById)
  getOfferById(ctx: StateContext<AppStateModel>, action: GetOfferById) {
    const offers = ctx.getState().offers;
    // if (offers) return;
    // TODO Prepare realization of right cache. Every subscription id plan group should be cached

    ctx.patchState({
      isOffersLoading: true,
      offersLoadedSuccess: false,
      offersLoadedError: null,
    });
    return this.appService.getOfferById(action.payload).pipe(
      tap((result: OffersDto[]) => {
        const newOffers: Offer[] = result.map(this.mapOffer);

        ctx.patchState({
          offers: newOffers,
          isOffersLoading: false,
          offersLoadedSuccess: true,
        });
      }, (err) => {
        ctx.patchState({
          servicesLoadedError: err,
          offersLoadedError: false,
        });
      })
    );
  }

  @Action(CreateSubscription)
  createSubscription(ctx: StateContext<AppStateModel>, action: CreateSubscription) {
    ctx.patchState({
      isSubscribeLoading: true,
      subscribedError: null,
      subscriptionSessionId: ''
    });
    return this.appService.subscribeToOffer(action.payload).pipe(
      tap((result: { sessionId: string }) => {
        ctx.patchState({
          isSubscribeLoading: false,
          subscriptionSessionId: result.sessionId
        });
      }, (err) => {
        ctx.patchState({
          subscribedError: err,
          isSubscribeLoading: false,
        });

        if (err && err.error && err.error.statusCode == 401) {
          ctx.dispatch(new TokenExpired());
        }
      })
    );
  }

  @Action(ChangePaymentSource)
  changePaymentSource(ctx: StateContext<AppStateModel>, action: ChangePaymentSource) {
    ctx.patchState({
      isSubscribeLoading: true,
      subscribedError: null,
      subscriptionSessionId: ''
    });
    return this.appService.changePaymentSource().pipe(
      tap((result: { sessionId: string }) => {
        if (!result) {
          ctx.patchState({
            subscribedError: 'Error occured while processing the request',
            isSubscribeLoading: false,
          });
        } else {
          ctx.patchState({
            isSubscribeLoading: false,
            subscriptionSessionId: result.sessionId
          });
        }
      }, (err) => {
        ctx.patchState({
          subscribedError: err,
          isSubscribeLoading: false,
        });

        if (err && err.error && err.error.statusCode == 401) {
          ctx.dispatch(new TokenExpired());
        }
      })
    );
  }

  @Action(NotifyUser)
  notifyUser(ctx: StateContext<AppStateModel>, action: NotifyUser) {
    const notifications = ctx.getState().notifications;
    notifications.push({ ...action.payload, id: ++this.notificationKey });
    ctx.patchState({ notifications: notifications.slice() });
    if (action.payload.willCloseAfter) {
      const index = this.notificationKey;
      setTimeout(() => {
        ctx.dispatch(new HideNotification({ id: index }));
      }, action.payload.willCloseAfter);
    }
    return of(null);
  }

  @Action(HideNotification)
  hideNotification(ctx: StateContext<AppStateModel>, action: HideNotification) {
    const notifications = ctx.getState().notifications;
    const index = notifications.findIndex(item => item.id === action.payload.id);
    notifications.splice(index, 1);
    ctx.patchState({ notifications: notifications.slice() });
    return of(null);
  }

  @Action(HideAllNotifications)
  hideAllNotifications(ctx: StateContext<AppStateModel>) {
    ctx.patchState({ notifications: [] });
    return of(null);
  }

  @Action(ClearSubscriptionCreationState)
  clearSubscriptionCreationState(ctx: StateContext<AppStateModel>) {
    ctx.patchState({
      isSubscribeLoading: false,
      subscribedError: null,
      subscriptionSessionId: ''
    });
    return of(null)
  }

  @Action(ShowSupportForm)
  showSupportForm(ctx: StateContext<AppStateModel>) {
    ctx.patchState({
      isSupportFormShown: true,
    });
    return of(null)
  }

  @Action(CloseSupportForm)
  closeSupportForm(ctx: StateContext<AppStateModel>) {
    ctx.patchState({
      isSupportFormShown: false,
    });
    return of(null)
  }

  @Action(GetSupport)
  getSupport(ctx: StateContext<AppStateModel>, action: GetSupport) {
    ctx.patchState({
      isSupportRequesting: true,
      supportRequestedSuccess: false,
      supportRequestedError: null
    });
    return this.appService.getSupport(action.payload).pipe(
      tap(() => {
        ctx.patchState({
          isSupportRequesting: false,
          supportRequestedSuccess: true
        });
      }, (err) => {
        ctx.patchState({
          supportRequestedError: err,
          isSupportRequesting: false,
        });
      })
    );
  }

  @Action(ClearGettingSupportState)
  clearGettingSupportState(ctx: StateContext<AppStateModel>) {
    ctx.patchState({
      isSupportRequesting: false,
      supportRequestedSuccess: false,
      supportRequestedError: null
    });
    return of(null)
  }

  @Action(CancelPaymentIntent)
  cancelPaymentIntent(ctx: StateContext<AppStateModel>, action: CancelPaymentIntent) {
    return this.appService.cancelPaymentIntent();
  }

  @Action(GetPaymentHistory)
  getPaymentHistory(ctx: StateContext<AppStateModel>) {
    ctx.patchState({
      isPaymentHistoryLoading: true,
      paymentHistoryError: null
    });
    return this.appService.getPaymentHistory().pipe(
      tap((response: PaymentHistoryDto[]) => {
          ctx.patchState({
            isPaymentHistoryLoading: false,
            paymentHistory: response.map(item => {
              return {
                amount: item.amount,
                currency: item.currency,
                status: item.status,
                cardBrand: <CardBrand>item.card_brand,
                cardLast4Numbers: item.card_last4,
                dateTime: new Date(item.created * 1000),
                logos: CardBrandFileName[item.card_brand.toLowerCase()]
              }
            })
          });
        }, (err) => {
          ctx.patchState({
            paymentHistoryError: err,
            isPaymentHistoryLoading: false,
          });
          if (err && err.error && err.error.statusCode == 401) {
            ctx.dispatch(new TokenExpired());
          }
        })
      );
  }

  @Action(GetPaymentSource)
  getPaymentSource(ctx: StateContext<AppStateModel>) {
    return this.appService.getPaymentSource().pipe(tap((data: any) => {
      ctx.patchState({
        paymentSource: {
          ...data,
          logo: CardBrandFileName[data.brand.toLowerCase()],
          last4: '**** **** **** ' + data.last4
        }
      });
    }))
  }

  @Action(ClearPaymentHistoryState)
  clearPaymentHistoryState(ctx: StateContext<AppStateModel>) {
    ctx.patchState({
      isPaymentHistoryLoading: false,
      paymentHistoryError: null
    });
    return of(null);
  }

  @Action(SaveOfferDetails)
  saveOfferDetails(ctx: StateContext<AppStateModel>, action: SaveOfferDetails) {
    ctx.patchState({
      demoOfferRequest: {
        planId: action.payload.planId,
        slotsCount: action.payload.slotsCount,
        createdAt: new Date().getTime()
      }
    })
  }

  @Action(CheckSavedOffer)
  checkSavedOffer(ctx: StateContext<AppStateModel>) {
    const { demoOfferRequest } = ctx.getState();
    if (!demoOfferRequest) return of(null);
    const diffInHours = (new Date().getTime() - demoOfferRequest.createdAt) / 1000 / 60 / 60 ;
    ctx.patchState({
      demoOfferRequest: undefined
    });
    if (diffInHours >= 1) {
      return of(null);
    }

    ctx.dispatch(new CreateOffer( { plan: { id: demoOfferRequest.planId }, slotsCount: demoOfferRequest.slotsCount }))
      .pipe(take(1))
      .subscribe(() => {
        this.modalService.openModal$(ModalPath.SuccessfullyPlaced, 'Successfully Placed').subscribe(()=> {
          ctx.dispatch(new ClearOfferCreationState());
        });
      });
  }

  mapOffer(offer) {
    return {
      id: offer.id,
      createdDate: offer.created_date,
      deletedDate: offer.deleted_date,
      plan: {
        id: offer.plan.id,
        name: offer.plan.name,
        description: offer.plan.description,
        maxSlots: offer.plan.max_slots,
        price: offer.plan.price,
        sellerSavingPrice: offer.plan.sellerSavingPrice,
        buyerCostPrice: offer.plan.buyerCostPrice,
        fee: offer.plan.fee,
        service: {
          id: offer.plan.service.id,
          name: offer.plan.service.name,
          description: offer.plan.service.description
        }
      },
      owner: {
        id: offer.owner.id,
        firstName: offer.owner.first_name,
        lastName: offer.owner.last_name,
        email: offer.owner.email,
        userAvatarId: offer.owner.logo ? offer.owner.logo.id : null,
      },
      slotsCount: offer.slotsCount,
      freeSlotsCount: offer.freeSlotsCount
    }
  }

}
