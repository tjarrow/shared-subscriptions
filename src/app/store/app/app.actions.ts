import { Service } from '@core/models/service.model';
import { Offer } from '@core/models/offers.model';
import { Notification } from '@core/models/notification.model';
import { PaymentHistoryItem } from '@core/models/payment-history-item.model';

export interface AppStateModel {
  isServicesLoading: boolean;
  servicesLoadedSuccess: boolean;
  servicesLoadedError: any;
  services: Service[] | null;

  isOfferCreating: boolean;
  offerCreatedSuccess: boolean;
  offerCreatedError: any;

  isOffersLoading: boolean;
  offersLoadedSuccess: boolean;
  offersLoadedError: any;
  offers: Offer[];

  isSubscribeLoading: boolean;
  subscribedError: any;
  subscriptionSessionId: string;

  notifications: Notification[];

  isSupportFormShown: boolean;
  isSupportRequesting: boolean;
  supportRequestedSuccess: boolean;
  supportRequestedError: any;

  paymentHistory: PaymentHistoryItem[];
  isPaymentHistoryLoading: boolean;
  paymentHistoryError: any;

  paymentSource: any;
  demoOfferRequest: { planId: number, slotsCount: number, createdAt: number } | undefined;
}

export class GetServices {
  static readonly type = '[App] GetServices';
}

export class CreateOffer {
  static readonly type = '[App] CreateOffer';
  constructor(public payload: { plan: { id: number }, slotsCount: number }) { }
}

export class ClearOfferCreationState {
  static readonly type = '[App] ClearOfferCreationState';
}

export class GetOffers {
  static readonly type = '[App] GetOffers';
  constructor(public payload: { id: number }) { }
}

export class GetOfferById {
  static readonly type = '[App] GetOfferById';
  constructor(public payload: { id: string }) { }
}

export class CreateSubscription {
  static readonly type = '[App] CreateSubscription';
  constructor(public payload: { offerId: string, quantity?: number }) { }
}

export class NotifyUser {
  static readonly type = '[App] NotifyUser';
  constructor(public payload: Notification) { }
}

export class HideNotification {
  static readonly type = '[App] HideNotification';
  constructor(public payload: {id: number}) { }
}

export class HideAllNotifications {
  static readonly type = '[App] HideAllNotifications';
}

export class ClearSubscriptionCreationState {
  static readonly type = '[App] ClearSubscriptionCreationState';
}

export class ShowSupportForm {
  static readonly type = '[App] ShowSupportForm';
}

export class CloseSupportForm {
  static readonly type = '[App] CloseSupportForm';
}

export class GetSupport {
  static readonly type = '[App] GetSupport';
  constructor(public payload: { email: string, message: string }) { }
}

export class ClearGettingSupportState {
  static readonly type = '[App] ClearGettingSupportState';
}

export class ClearSubscriptions {
  static readonly type = '[App] ClearSubscriptions';
}

export class CancelPaymentIntent {
  static readonly type = '[App] CancelPaymentIntent';
}

export class GetPaymentHistory {
  static readonly type = '[App] GetPaymentHistory';
}

export class ClearPaymentHistoryState {
  static readonly type = '[App] ClearPaymentHistoryState';
}

export class GetPaymentSource {
  static readonly type = '[App] GetPaymentSource';
}

export class ChangePaymentSource {
  static readonly type = '[App] ChangePaymentSource';
}

export class SaveOfferDetails {
  static readonly type = '[App] SaveOfferDetails';
  constructor(public payload: {planId: number, slotsCount: number }) { }
}

export class CheckSavedOffer {
  static readonly type = '[App] CheckSavedOffer';
}
