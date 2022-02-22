import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchFilterUser'
})
export class SearchFilterUserPipe implements PipeTransform {

  transform(value: any, arg: any): any {
    if (arg == '') return value;
    const resultFilter = [];
    for (const user of value) {
      let lastNameName = user.lastName + " " + user.name;
      let nameLastName = user.name + " " + user.lastName;
      if (lastNameName.toLowerCase().indexOf(arg.toLowerCase()) > -1) {
        if (!resultFilter.some(x => x.id == user.id)) {
          resultFilter.push(user);
        }
      }
      if (nameLastName.toLowerCase().indexOf(arg.toLowerCase()) > -1) {
        if (!resultFilter.some(x => x.id == user.id)) {
          resultFilter.push(user);
        }
      } if (user.roleName.toLowerCase().indexOf(arg.toLowerCase()) > -1) {
        if (!resultFilter.some(x =>x.id == user.id)) {
          resultFilter.push(user);
        }
      }
    };
    return resultFilter;
  }


}
