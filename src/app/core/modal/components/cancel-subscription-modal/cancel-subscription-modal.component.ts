import { Component, Input, OnInit } from '@angular/core';
import { ModalService } from "@shared/services/modal/modal.service";
import { AppService } from "@shared/services/app/app.service";
import { Router } from "@angular/router";
import { Store } from "@ngxs/store";
import { CancelOffer, CancelSubscription } from "@store/app/subscriptions.actions";
import { SubscriptionType } from "@core/models/subscription-type.model"
import { Observable } from "rxjs";

@Component({
  selector: 'app-cancel-subscription-modal',
  templateUrl: './cancel-subscription-modal.component.html',
  styleUrls: ['./cancel-subscription-modal.component.scss']
})
export class CancelSubscriptionModalComponent implements OnInit {
  public subscriptionId: number;
  public offerId: number;
  public itemType: SubscriptionType;

  constructor(private modalService: ModalService,
              private appService: AppService,
              private router: Router,
              private store: Store) { }

  ngOnInit(): void {
    this.itemType = this.modalService.cancelledItemType;
    this.offerId = this.modalService.cancelledItemId;
    this.subscriptionId = this.modalService.cancelledItemId;
  }

  confirmSubscriptionCancelling(): Observable<any> {
    this.modalService.closeModal();
    this.router.navigateByUrl('/my-subscriptions');
    return this.itemType == 1 ?
      this.store.dispatch(new CancelOffer({ offerId: this.offerId }))
      : this.store.dispatch(new CancelSubscription({ subscriptionId: this.subscriptionId }));
  }

  handleCloseClick() {
    this.modalService.closeModal();
    this.router.navigateByUrl('/my-subscriptions');
  }
}
