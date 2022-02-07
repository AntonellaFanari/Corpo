import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchFilterName'
})
export class SearchFilterNamePipe implements PipeTransform {

  transform(value: any, arg: any): any {
    if (arg == '') return value;
    const resultFilter = [];
    for (const x of value) {
      if ((x.name) && (x.name.toLowerCase().indexOf(arg.toLowerCase()) > -1)) {
        resultFilter.push(x);
      }
    };
    return resultFilter;
  }

}
