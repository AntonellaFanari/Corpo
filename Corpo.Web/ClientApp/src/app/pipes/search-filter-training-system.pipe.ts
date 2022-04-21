import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchFilterTrainingSystem'
})
export class SearchFilterTrainingSystemPipe implements PipeTransform {
  transform(value: any, arg: any): any {
    if (arg == '') return value;
    const resultFilter = [];
    for (const trainingSystem of value) {
      if (trainingSystem.up.toLowerCase().indexOf(arg.toLowerCase()) > -1) {
        resultFilter.push(trainingSystem);
      } if (trainingSystem.down.toLowerCase().indexOf(arg.toLowerCase()) > -1) {
        resultFilter.push(trainingSystem);
      }
    };
    return resultFilter;
  }
}
