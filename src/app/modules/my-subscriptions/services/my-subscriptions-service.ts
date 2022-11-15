import { Injectable } from '@angular/core';
import { OfferService } from "@core/models/offers.model";
import { environment } from "../../../../environments/environment";
import { SubscriptionSlot } from "@core/models/subscription-slot.model";
import { ModalPath } from "@core/modal/modal-routes.model";
import { ModalService } from "@shared/services/modal/modal.service";
import {SlotStatus} from "@core/models/slot-status.model";
import {SubscriptionType} from "@core/models/subscription-type.model";

@Injectable({
  providedIn: 'root'
})
export class MySubscriptionsService {
  public currentSubscriptionSlotIndex: number;
  public currentSubscriptionIndex: number;
  public isCurrentUser = false;
  public maxSubscribersNumberToDisplay = 4;

  constructor(private modalService: ModalService) { }

  getSubscriptionStatus(status): string {
    return SlotStatus[status];
  }

  getCurrentSubscriptionAndSlotIndices(subscriptionSlotIndex: number, subscriptionIndex: number): void {
    this.currentSubscriptionSlotIndex = subscriptionSlotIndex;
    this.currentSubscriptionIndex = subscriptionIndex;
  }

  getOfferServiceImg(service: OfferService): string {
    if (service.logoId) {
      return `${environment.apiUrl}/users/logo/${service.logoId}`;
    }
    return `assets/images/services/${service.name.toLowerCase()}.svg`;
  }

  getSubscriberName(slot: SubscriptionSlot): string {
    const currentUserEmail = JSON.parse(localStorage.getItem('auth.email'));
    if (slot.buyer) {
      if (slot.buyer.email == currentUserEmail) {
        this.isCurrentUser = true;
        return `It is`;
      }
      const lastNameLetter = slot.buyer.last_name[0];
      return `${slot.buyer.first_name} ${lastNameLetter}`;
    }
  }



  displayCurrentNumberOfSubscribers(slots: SubscriptionSlot[]): string {
    const subscribersNum = slots.length;
    if (subscribersNum > this.maxSubscribersNumberToDisplay) {
      return `${this.maxSubscribersNumberToDisplay}`;
    }
    return `${subscribersNum}`;
  }

  openCancelSubscriptionModal(id: number, itemType: SubscriptionType): void {
    this.modalService.openModal$(ModalPath.CancelSubscription, 'Cancel a subscription');
    this.modalService.getDataForCancelSubscriptionOrOffer(id, itemType);
  }

}
