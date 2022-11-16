import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterLevel'
})
export class FilterLevelPipe implements PipeTransform {

  transform(value: any, arg: any): any {
    if (arg == '') return value;
    const resultFilter = [];
    for (const x of value) {
      let level = "Nivel" + " " + x.level;
      if ((level) && (level.toLowerCase().indexOf(arg.toLowerCase()) > -1)) {
        resultFilter.push(x);
      }
    };
    return resultFilter;
  }
}
