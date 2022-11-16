import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterGoal'
})
export class FilterGoalPipe implements PipeTransform {

  transform(value: any, arg: any): any {
    if (arg == '') return value;
    const resultFilter = [];
    for (const x of value) {
      if ((x.goal) && (x.goal.toLowerCase().indexOf(arg.toLowerCase()) > -1)) {
        resultFilter.push(x);
      }
    };
    return resultFilter;
  }
}
