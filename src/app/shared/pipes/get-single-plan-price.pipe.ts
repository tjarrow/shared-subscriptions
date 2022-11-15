import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'getSinglePlanPrice'
})
export class GetSinglePlanPricePipe implements PipeTransform {

  constructor() {}

  transform(priceValue) {
    return priceValue / 100;
  }

}
