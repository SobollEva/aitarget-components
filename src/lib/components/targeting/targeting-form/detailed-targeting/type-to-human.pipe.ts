import { Pipe, PipeTransform } from '@angular/core';
import { TranslateService } from 'ng2-translate/ng2-translate';

@Pipe({
  name: 'typeToHuman'
})
export class TypeToHumanPipe implements PipeTransform {

  constructor (private translateService: TranslateService) {}

  transform (value: any, args?: any): any {
    if (value && typeof value === 'string') {
      return this.translateService.instant(`detailed-targeting-dropdown-suggested.${value.toUpperCase()}`) || value;
    } else {
      return value;
    }
  }

}