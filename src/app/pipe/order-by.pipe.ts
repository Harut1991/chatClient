import {Pipe, PipeTransform} from '@angular/core';

@Pipe({name: 'orderBy'})
export class OrderByPipe implements PipeTransform {
  transform(value: Array<any>, field: string): any {
    if (value == null) {
      return null;
    }
    return [...value].sort((a, b) => b[field] - a[field]);
  }
}

