import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchFilterIntensity'
})
export class SearchFilterIntensityPipe implements PipeTransform {
  transform(value: any, arg: any): any {
    if (arg == '') return value;
    const resultFilter = [];
    for (const intensity of value) {
      if (intensity.up.toLowerCase().indexOf(arg.toLowerCase()) > -1) {
        resultFilter.push(intensity);
      } if (intensity.down.toLowerCase().indexOf(arg.toLowerCase()) > -1) {
        resultFilter.push(intensity);
      }
    };
    return resultFilter;
  }


}
