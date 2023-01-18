import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'temperatureConverter'
})
export class TemperatureConverterPipe implements PipeTransform {

  transform(fahrenheit: number): number {
    return (fahrenheit - 32) * 5/9;
  }

}
