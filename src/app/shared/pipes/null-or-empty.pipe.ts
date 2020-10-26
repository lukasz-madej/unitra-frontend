import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'nullOrEmpty'
})
export class NullOrEmptyPipe implements PipeTransform {

  transform(value: string, replacement: string): string {
    if (!value || value === '') {
      return replacement;
    }
    return value;
  }
}
