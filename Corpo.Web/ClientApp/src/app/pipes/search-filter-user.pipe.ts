import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchFilterUser'
})
export class SearchFilterUserPipe implements PipeTransform {

  transform(value: any, arg: any): any {
    if (arg == '') return value;
    const resultFilter = [];
    for (const user of value) {
      if (user.lastName.toLowerCase().indexOf(arg.toLowerCase()) > -1) {
        resultFilter.push(user);
      } if (user.name.toLowerCase().indexOf(arg.toLowerCase()) > -1) {
        resultFilter.push(user);
      } if (user.roleName.toLowerCase().indexOf(arg.toLowerCase()) > -1) {
        resultFilter.push(user);
      }
    };
    return resultFilter;
  }


}
