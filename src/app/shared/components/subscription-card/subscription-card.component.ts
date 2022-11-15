import { Component, Input, OnInit } from '@angular/core';
import { Service, ServiceName } from '@core/models/service.model'
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-subscription-card',
  templateUrl: './subscription-card.component.html',
  styleUrls: ['./subscription-card.component.scss']
})
export class SubscriptionCardComponent implements OnInit {
  public serviceName = ServiceName;
  public activeTab: number = 1;
  public ownerSavingPrice: number;
  public subscriberPrice: number;

  private _service: Service;
  get imageSrc() {
    if (this.service.logo) {
      return `${environment.apiUrl}/users/logo/${this.service.logo.id}`
    }

    return `assets/images/services/${ this.service.name.toLowerCase() }.svg`
  }

  @Input() set service(value: Service) {
    this._service = value;
    this.activeTab = Math.random() > .5 ? 1 : 2;


    if (value.plans && value.plans.length) {
      this.ownerSavingPrice = Math.max.apply(Math, value.plans.map(p => (p.maxSlots - 1) * p.sellerSavingPrice)) / 100;
      this.subscriberPrice = Math.min.apply(Math, value.plans.map(p => p.buyerCostPrice)) / 100;
    }

  }

  get service(): Service {
    return this._service;
  }

  constructor() { }

  ngOnInit(): void {

  }

  
}
