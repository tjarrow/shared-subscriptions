import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SubscriptionsListComponent } from './pages/subscriptions-list/subscriptions-list.component';
import { SharedModule } from "@shared/shared.module";
import { MySubscriptionsRoutingModule } from "./my-subscriptions-routing.module";
import { SubscriptionsListItemComponent } from './pages/subscriptions-list-item/subscriptions-list-item.component';
import { SubscriptionsListOfferItemComponent } from './pages/subscriptions-list-offer-item/subscriptions-list-offer-item.component';



@NgModule({
  declarations: [
    SubscriptionsListComponent,
    SubscriptionsListItemComponent,
    SubscriptionsListOfferItemComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    MySubscriptionsRoutingModule
  ]
})
export class MySubscriptionsModule { }
