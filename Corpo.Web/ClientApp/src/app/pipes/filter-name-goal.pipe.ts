import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterNameGoal'
})
export class FilterNameGoalPipe implements PipeTransform {

  transform(value: any, arg: any): any {
    if (arg == '') return value;
    const resultFilter = [];
    for (const x of value) {
      if (x.name.toLowerCase().indexOf(arg.toLowerCase()) > -1) {
        resultFilter.push(x);
      } if (x.goal.toLowerCase().indexOf(arg.toLowerCase()) > -1) {
        let exists = resultFilter.find(x => x.id == x.id);
        if(!exists) resultFilter.push(x);
      }
    };
    return resultFilter;
  }

}
