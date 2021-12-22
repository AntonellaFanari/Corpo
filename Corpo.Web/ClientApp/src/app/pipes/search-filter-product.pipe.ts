import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchFilterProduct'
})
export class SearchFilterProductPipe implements PipeTransform {

  transform(value: any, arg: any): any {
    if (arg == '') return value;
    const resultFilter = [];
    for (const prod of value) {
      if (prod.description.toLowerCase().indexOf(arg.toLowerCase()) > -1) {
        resultFilter.push(prod);
      }
    };
    return resultFilter;
  }

}
