import { Offer } from "@core/models/offers.model";
import { Service } from "@core/models/service.model";
import { Selector } from "@ngxs/store";
import { AppStateModel } from "./app.actions";
import { AppState } from "./app.state";
import { Notification } from '@core/models/notification.model';
import { PaymentHistoryItem } from "@core/models/payment-history-item.model";

export class AppGetterState {

  @Selector([AppState])
  static isServicesLoading(state: AppStateModel): boolean {
    return state.isServicesLoading;
  }

  @Selector([AppState])
  static servicesLoadedSuccess(state: AppStateModel): boolean {
    return state.servicesLoadedSuccess;
  }

  @Selector([AppState])
  static servicesLoadedError(state: AppStateModel): boolean {
    return state.servicesLoadedError;
  }

  @Selector([AppState])
  static hasLoadedServices(state: AppStateModel): boolean {
    return Boolean(state.services);
  }

  @Selector([AppState])
  static servicesInfo(state: AppStateModel): Service[] {
    return state.services;
  }

  @Selector([AppState])
  static isOfferCreating(state: AppStateModel): boolean {
    return state.isOfferCreating;
  }

  @Selector([AppState])
  static offerCreatedSuccess(state: AppStateModel): boolean {
    return state.offerCreatedSuccess;
  }

  @Selector([AppState])
  static offerCreatedError(state: AppStateModel): any {
    return state.offerCreatedError;
  }

  @Selector([AppState])
  static isOffersLoading(state: AppStateModel): boolean {
    return state.isOffersLoading;
  }

  @Selector([AppState])
  static offersLoadedSuccess(state: AppStateModel): boolean {
    return state.offersLoadedSuccess;
  }

  @Selector([AppState])
  static offersLoadedError(state: AppStateModel): any {
    return state.offersLoadedError;
  }

  @Selector([AppState])
  static offersInfo(state: AppStateModel): Offer[] {
    return state.offers;
  }

  @Selector([AppState])
  static isSubscribeLoading(state: AppStateModel): boolean {
    return state.isSubscribeLoading;
  }

  @Selector([AppState])
  static subscribedError(state: AppStateModel): any {
    return state.subscribedError;
  }

  @Selector([AppState])
  static subscriptionSessionId(state: AppStateModel): string {
    return state.subscriptionSessionId;
  }

  @Selector([AppState])
  static notifications(state: AppStateModel): Notification[] {
    return state.notifications;
  }

  @Selector([AppState])
  static isSupportFormShown(state: AppStateModel): boolean {
    return state.isSupportFormShown;
  }

  @Selector([AppState])
  static isSupportRequesting(state: AppStateModel): boolean {
    return state.isSupportRequesting;
  }

  @Selector([AppState])
  static supportRequestedSuccess(state: AppStateModel): boolean {
    return state.supportRequestedSuccess;
  }

  @Selector([AppState])
  static supportRequestedError(state: AppStateModel): any {
    return state.supportRequestedError;
  }

  @Selector([AppState])
  static isPaymentHistoryLoading(state: AppStateModel): boolean {
    return state.isPaymentHistoryLoading;
  }

  @Selector([AppState])
  static paymentHistory(state: AppStateModel): PaymentHistoryItem[] {
    return state.paymentHistory;
  }

  @Selector([AppState])
  static paymentHistoryError(state: AppStateModel): any {
    return state.paymentHistoryError;
  }
}
