import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchFilterMember'
})
export class SearchFilterMemberPipe implements PipeTransform {

  transform(value: any, arg: any): any {
    if (arg == '') return value;
    const resultFilter = [];
    for (const member of value) {
      if (member.lastName.toLowerCase().indexOf(arg.toLowerCase()) > -1) {
        resultFilter.push(member);
      } if (member.name.toLowerCase().indexOf(arg.toLowerCase()) > -1) {
        resultFilter.push(member);
      } if (member.namePlan.toLowerCase().indexOf(arg.toLowerCase()) > -1) {
        resultFilter.push(member);
      }
    };
    return resultFilter;
  }

}
