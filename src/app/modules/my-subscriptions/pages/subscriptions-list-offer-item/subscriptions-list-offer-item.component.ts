import { Component, Input, OnInit } from '@angular/core';
import { MySubscriptionsService } from "../../services/my-subscriptions-service";
import { SubscriptionOffer } from "@core/models/subscription-offer.model";

@Component({
  selector: 'app-subscriptions-list-offer-item',
  templateUrl: './subscriptions-list-offer-item.component.html',
  styleUrls: ['./subscriptions-list-offer-item.component.scss']
})
export class SubscriptionsListOfferItemComponent implements OnInit {

  @Input() subscriptionOffers: SubscriptionOffer[]
  constructor(private mySubscriptionsService: MySubscriptionsService) { }

  ngOnInit(): void {
  }

}
