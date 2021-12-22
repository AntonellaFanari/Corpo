import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchFilterPlan'
})
export class SearchFilterPlanPipe implements PipeTransform {

  transform(value: any, arg: any): any {
    if (arg == '') return value;
    const resultFilter = [];
    for (const plan of value) {
      if (plan.name.toLowerCase().indexOf(arg.toLowerCase()) > -1) {
        resultFilter.push(plan);
      } else {
        for (const clas of plan.classes) {
          if (clas.name.toLowerCase().indexOf(arg.toLowerCase()) > -1) {
            resultFilter.push(plan);
          }
        };
      }
    };
    return resultFilter;
  }

  

}
