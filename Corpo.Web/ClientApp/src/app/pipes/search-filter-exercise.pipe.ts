import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchFilterExercise'
})
export class SearchFilterExercisePipe implements PipeTransform {


  transform(value: any, arg: any): any {
    if (arg == '') return value;
    const resultFilter = [];
    for (const exercise of value) {
      if (exercise.name.toLowerCase().indexOf(arg.toLowerCase()) > -1) {
        if (!resultFilter.some(x => x.id == exercise.id)) {
          resultFilter.push(exercise);
        }
      } if (exercise.categoryExercise.name.toLowerCase().indexOf(arg.toLowerCase()) > -1) {
        if (!resultFilter.some(x => x.id == exercise.id)) {
          resultFilter.push(exercise);
        }
      } else {
        for (const tag of exercise.tags) {
          if (tag.name.toLowerCase().indexOf(arg.toLowerCase()) > -1) {
            if (!resultFilter.some(x => x.id == exercise.id)) {
              resultFilter.push(exercise);
            }
          }
        };
      }
    };
      return resultFilter;
    }

}
