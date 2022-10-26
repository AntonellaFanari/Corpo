import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterNameGoal'
})
export class FilterNameGoalPipe implements PipeTransform {

  transform(value: any, arg: any): any {
    if (arg == '') return value;
    const resultFilter = [];
    for (const template of value) {
      if (template.name.toLowerCase().indexOf(arg.toLowerCase()) > -1) {
        resultFilter.push(template);
      } if (template.goal.toLowerCase().indexOf(arg.toLowerCase()) > -1) {
        let exists = resultFilter.find(x => x.id == template.id);
        if(!exists) resultFilter.push(template);
      }
    };
    return resultFilter;
  }

}
