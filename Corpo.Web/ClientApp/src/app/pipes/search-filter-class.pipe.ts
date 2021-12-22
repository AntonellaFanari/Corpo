import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchFilterClass'
})
export class SearchFilterClassPipe implements PipeTransform {

  transform(value: any, arg: any): any {
    if (arg == '') return value;
    const resultFilter = [];
    for (const clas of value) {
      if (clas.name.toLowerCase().indexOf(arg.toLowerCase()) > -1) {
        resultFilter.push(clas);
      }
    };
    return resultFilter;
  }

}
