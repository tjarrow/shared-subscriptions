import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'subscriptionPrice'
})
export class GetSubscriptionPrice implements PipeTransform {
  constructor() {}

  transform(value) {
    return Math.min.apply(Math, value.plans.map(p => p.buyerCostPrice)) / 100;
  }
}
