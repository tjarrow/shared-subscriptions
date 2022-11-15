import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import jwt_decode from "jwt-decode";

@Injectable({ providedIn: 'root' })
export class AppService {
  constructor(private httpClient: HttpClient) {

  }

  public getServices() {
    return this.httpClient.get(`${environment.apiUrl}/services`);
  }

  public postOffer(payload: { plan: { id: number }, slotsCount: number }) {
    return this.httpClient.post(`${environment.apiUrl}/offers`, payload);
  }

  public getOffers(payload: { id: number }) {
    let params = new HttpParams();
    params = params.append('serviceId', payload.id.toString());
    return this.httpClient.get(`${environment.apiUrl}/offers/market`, { params: params });
  }

  public getOfferById(payload: { id: string }) {
    let params = new HttpParams();
    params = params.append('s', JSON.stringify({
      'uuid': payload.id
    }));
    return this.httpClient.get(`${environment.apiUrl}/offers`, { params: params });
  }

  public subscribeToOffer(payload: { offerId: string, quantity?: number }) {
    return this.httpClient.post(`${environment.apiUrl}/slot/subscribe/${payload.offerId}?useStripe=true`, { quantity: payload.quantity });
  }

  public getSupport(payload: {email: string, message: string}) {
    return this.httpClient.post(`${environment.apiUrl}/support/`, payload);
  }

  public getPaymentHistory() {
    return this.httpClient.get(`${environment.apiUrl}/payment/history`);
  }

  public cancelPaymentIntent() {
    return this.httpClient.post(`${environment.apiUrl}/payment/clear`, null);
  }

  public getPaymentSource() {
    return this.httpClient.get(`${environment.apiUrl}/payment/sources`);
  }

  public changePaymentSource() {
    return this.httpClient.post(`${environment.apiUrl}/payment/sources`, null);
  }

  public getOffersAndSubscriptions() {
    return this.httpClient.get(`${environment.apiUrl}/subscriptions/userdata`)
  }

  public cancelSubscription(payload: {subscriptionId: number}) {
    return this.httpClient.post(`${environment.apiUrl}/subscriptions/cancel/${payload.subscriptionId}`, null);
  }

  public cancelOffer(payload: {offerId: number}) {
    return this.httpClient.patch(`${environment.apiUrl}/offers/cancel/${payload.offerId}`, null);
  }

}
