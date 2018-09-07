import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'stripHtmlTags'
})
export class StripHtmlTagsPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    return null;
  }

}
