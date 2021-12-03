import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchFilter'
})
export class SearchFilterPipe implements PipeTransform {

  transform(value: any, arg: any): any {
    if (arg == '') return value;
    const resultFilter = [];
    for (const shift of value) {
      if (shift.className.toLowerCase().indexOf(arg.toLowerCase()) > -1) {
        resultFilter.push(shift);
      } if (shift.quota.toString().indexOf(arg.toString()) > -1) {
        resultFilter.push(shift);
      } if (shift.userName.toLowerCase().indexOf(arg.toLowerCase()) > -1) {
        resultFilter.push(shift);
      } if (shift.day.toLowerCase().indexOf(arg.toLowerCase()) > -1) {
        resultFilter.push(shift);
      };
    };
    return resultFilter;
  }

}
