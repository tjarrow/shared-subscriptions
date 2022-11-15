import { Component, OnDestroy, OnInit } from '@angular/core';
import { Select, Store } from "@ngxs/store";
import { Subscription } from "@core/models/subscription.model";
import { Observable, Subject } from "rxjs";
import { GetSubscriptions } from "@store/app/subscriptions.actions";
import { mergeMap, takeUntil } from "rxjs/operators";
import { SubscriptionOffer } from "@core/models/subscription-offer.model";
import { ModalService } from "@shared/services/modal/modal.service";
import { AuthGetterState } from "@store/auth/auth-getter.state";
import { Router } from "@angular/router";
import { SubscriptionsGetterState } from "@store/app/subscriptions-getter.state";

@Component({
  selector: 'app-subscriptions-list',
  templateUrl: './subscriptions-list.component.html',
  styleUrls: ['./subscriptions-list.component.scss']
})
export class SubscriptionsListComponent implements OnInit, OnDestroy {
  public subscriptions: Subscription[];
  public serviceName: string;
  public subscriptionOffers: SubscriptionOffer[];
  public alive$: Subject<void> = new Subject();

  @Select(SubscriptionsGetterState.isSubscriptionsLoading) isLoading$: Observable<boolean>;
  @Select(SubscriptionsGetterState.subscriptionsLoadedError) subscriptionLoadedError$: Observable<any>;
  @Select(AuthGetterState.isAuthenticated) isAuthenticated$: Observable<boolean>;

  constructor(private store: Store,
              private modalService: ModalService,
              private router: Router) { }

  ngOnInit(): void {
    this.store.dispatch(new GetSubscriptions())
      .pipe(
        takeUntil(this.alive$),
        mergeMap(() => this.store.select(SubscriptionsGetterState.subscriptionsInfo))
      ).subscribe((subscriptionsWithOffers) => {
      [this.subscriptionOffers, this.subscriptions] = subscriptionsWithOffers;
    });
  }

  navigateToMarket() {
    this.router.navigate(['/market'])
  }

  ngOnDestroy(): void {
    this.alive$.next();
    this.alive$.complete();
  }

}
