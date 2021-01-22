import {NgxSmoothScrollOption, NgxSmoothScrollDirectiveOption} from '@eunsatio/ngx-smooth-scroll';

export interface ScrollProperty {
  [key: string]: any;
  options: NgxSmoothScrollOption | NgxSmoothScrollDirectiveOption;
}
