import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'isArray'
})
export class IsArrayPipe implements PipeTransform {
  constructor() {}

  transform(value) {
    return Array.isArray(value);
  }
}
