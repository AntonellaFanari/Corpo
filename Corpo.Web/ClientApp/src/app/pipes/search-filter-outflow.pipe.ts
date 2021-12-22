import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchFilterOutflow'
})
export class SearchFilterOutflowPipe implements PipeTransform {


  transform(value: any, arg: any): any {
    if (arg == '') return value;
    const resultFilter = [];
    for (const outflow of value) {
      if (outflow.name.toLowerCase().indexOf(arg.toLowerCase()) > -1) {
        resultFilter.push(outflow);
      }
    };
    return resultFilter;
  }

}
