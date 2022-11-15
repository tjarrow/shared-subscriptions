import { Component, Input, OnInit } from '@angular/core';
import { Subscription } from "@core/models/subscription.model";
import { MySubscriptionsService } from "../../services/my-subscriptions-service";

@Component({
  selector: 'app-subscriptions-list-item',
  templateUrl: './subscriptions-list-item.component.html',
  styleUrls: ['./subscriptions-list-item.component.scss']
})
export class SubscriptionsListItemComponent implements OnInit {

  @Input() subscriptions: Subscription[]

  constructor(public mySubscriptionsService: MySubscriptionsService) { }

  ngOnInit(): void {
  }

}
