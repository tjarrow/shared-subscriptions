import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: 'snakeCase'
})
export class SnakeCasePipe implements PipeTransform {
  constructor() {}

  transform(value) {
    if (!value) return value;

    return value.replace(/ /g, '_');
  }
}
