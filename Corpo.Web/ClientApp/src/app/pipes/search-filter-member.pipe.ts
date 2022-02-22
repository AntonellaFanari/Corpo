import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchFilterMember'
})
export class SearchFilterMemberPipe implements PipeTransform {

  transform(value: any, arg: any): any {
    if (arg == '') return value;
    const resultFilter = [];
    for (const member of value) {
      let lastNameName = member.lastName + " " + member.name;
      let nameLastName = member.name + " " + member.lastName;
      if (lastNameName.toLowerCase().indexOf(arg.toLowerCase()) > -1) {
        if (!resultFilter.some(x => x.id == member.id)) {
          resultFilter.push(member);
        }
      }
      if (nameLastName.toLowerCase().indexOf(arg.toLowerCase()) > -1) {
        if (!resultFilter.some(x => x.id == member.id)) {
          resultFilter.push(member);
        }
      } if (member.namePlan.toLowerCase().indexOf(arg.toLowerCase()) > -1) {
        if (!resultFilter.some(x => x.id == member.id)) {
          resultFilter.push(member);
        }
      }
    };
    return resultFilter;
  }

}
