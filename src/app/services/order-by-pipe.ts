import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'orderBy'
})
export class OrderByPipe implements PipeTransform {
  transform(value: any[], args?: any): any[] {
    if (!value) {
      return value;
    }
    const property = args[0];
    const isAsc = args[1] === 'asc';
    return value.sort((a, b) => {
      if (a[property] < b[property]) {
        return isAsc ? -1 : 1;
      } else if (a[property] > b[property]) {
        return isAsc ? 1 : -1;
      } else {
        return 0;
      }
    });
  }
}
