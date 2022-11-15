import { NgModule } from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {SubscriptionsListComponent} from "./pages/subscriptions-list/subscriptions-list.component";

const routes: Routes = [
  {
    path: '',
    component: SubscriptionsListComponent
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MySubscriptionsRoutingModule { }
