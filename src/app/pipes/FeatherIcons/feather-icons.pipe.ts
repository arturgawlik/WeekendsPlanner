import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { icons } from 'feather-icons';

@Pipe({
  name: 'feather'
})
export class FeatherIconsPipe implements PipeTransform {

  constructor(private sanitizer: DomSanitizer) {
  }

  transform(icon: string, size: number = 30, color: string = 'inherit') {
    return this.sanitizer.bypassSecurityTrustHtml(icons[icon].toSvg({
      width: size,
      height: size,
      color: color
    }));
  }

}
