import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { delay, switchMap, take, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

declare var Stripe;

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent implements OnInit {

  offers: any[] = [];
  subscriptions: any[] = [];
  form = this.fb.group({
    offerId: ['', Validators.required]
  });

  paymentFinished: boolean;

  constructor(private httpClient: HttpClient, private fb: FormBuilder) { }

  init() {
    this.httpClient.get(`${environment.apiUrl}/offers`)
      .pipe(take(1))
      .subscribe(data => {
        this.offers = <any[]>data;
      });

    this.httpClient.get(`${environment.apiUrl}/subscriptions`)
      .pipe(take(1))
      .subscribe(data => {
        this.subscriptions = <any[]>data;
      });
  }

  ngOnInit(): void {
    this.init();
  }

  processSubscription() {
    const { offerId } = this.form.value;

    this.httpClient.post(`${environment.apiUrl}/slot/subscribe/${offerId}?useStripe=true`, null)
      .pipe(take(1))
      .subscribe((data: any) => {
        const stripe = Stripe(environment.stripeKey);

        stripe.redirectToCheckout({
          sessionId: data.sessionId
        }).then(() => this.paymentFinished = true);
      });
  }

  cancelSubscription(itemId) {
    this.httpClient.post(`${environment.apiUrl}/subscriptions/cancel/${itemId}`, null)
      .pipe(
        tap(() => this.subscriptions = []),
        delay(5000),
        tap(() => this.init()))
      .subscribe();

  }
}
