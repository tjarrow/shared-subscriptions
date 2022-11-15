import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalPath } from '@core/modal/modal-routes.model';
import { Select, Store } from '@ngxs/store';
import { ModalService } from '@shared/services/modal/modal.service';
import { AppGetterState } from '@store/app/app-getter.state';
import { ChangePaymentSource, GetPaymentSource } from '@store/app/app.actions';
import { Observable, Subject } from 'rxjs';
import { mergeMap, takeUntil } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
declare var Stripe;

@Component({
  selector: 'app-payment-method',
  templateUrl: './payment-method.component.html',
  styleUrls: ['./payment-method.component.scss']
})
export class PaymentMethodComponent implements OnInit, OnDestroy {
  @Select(state => state.app.paymentSource) source$: Observable<any>;

  private _alive$: Subject<void> = new Subject<void>();

  constructor(private store: Store, private route: ActivatedRoute, private router: Router, private modalService: ModalService) { }

  ngOnInit(): void {
    this.store.dispatch(new GetPaymentSource());
    this.showModalWhenSuccessfullySubscribed();
  }

  changePaymentSource() {
    this.store.dispatch(new ChangePaymentSource()).pipe(
      takeUntil(this._alive$),
      mergeMap(() => this.store.select(AppGetterState.subscriptionSessionId))
    ).subscribe((sessionId: string ) => {
      const stripe = Stripe(environment.stripeKey);
      stripe.redirectToCheckout({ sessionId: sessionId });
    });
  }

  showModalWhenSuccessfullySubscribed() {
    const stripePaymentStatus = this.route.snapshot.queryParams.status;
    if (stripePaymentStatus == "successful" ) {
      this.router.navigate([], { queryParams: { status: null }, queryParamsHandling: 'merge' });
      setTimeout(() => {
        this.modalService.openModal$(ModalPath.SuccessfullyChanged, 'Successfully Changed');
      }, 100);
    } else if (stripePaymentStatus == 'cancelled') {
      this.router.navigate([], { queryParams: { status: null }, queryParamsHandling: 'merge' });
    }
  }

  ngOnDestroy() {
    this._alive$.next();
    this._alive$.complete();
  }
}
