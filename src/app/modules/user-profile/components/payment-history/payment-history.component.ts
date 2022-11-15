import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store, Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { GetPaymentHistory, ClearPaymentHistoryState } from '@store/app/app.actions';
import { PaymentHistoryItem } from '@core/models/payment-history-item.model';
import { AppGetterState } from '@store/app/app-getter.state';

@Component({
  selector: 'app-payment-history',
  templateUrl: './payment-history.component.html',
  styleUrls: ['./payment-history.component.scss']
})
export class PaymentHistoryComponent implements OnInit, OnDestroy {
  @Select(AppGetterState.isPaymentHistoryLoading) isPaymentHistoryLoading$: Observable<boolean>;
  @Select(AppGetterState.paymentHistory) paymentHistory$: Observable<PaymentHistoryItem[]>;
  @Select(AppGetterState.paymentHistoryError) paymentHistoryError$: Observable<any>;

  constructor(private store: Store) { }

  ngOnInit(): void {
    this.store.dispatch(new GetPaymentHistory());

    this.paymentHistoryError$.subscribe(err => console.log(err));
  }

  ngOnDestroy(): void {
    this.store.dispatch(new ClearPaymentHistoryState());
  }

}
