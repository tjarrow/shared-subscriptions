import { Component, Input, OnInit } from '@angular/core';
import { Offer } from '@core/models/offers.model';
import { environment } from "src/environments/environment";

@Component({
  selector: 'app-offer',
  templateUrl: './offer.component.html',
  styleUrls: ['./offer.component.scss']
})
export class OfferComponent implements OnInit {
  public apiUrl: string = environment.apiUrl;

  @Input() offer: Offer;
  @Input() serviceName: string;

  constructor() { }

  ngOnInit(): void {

  }

}
