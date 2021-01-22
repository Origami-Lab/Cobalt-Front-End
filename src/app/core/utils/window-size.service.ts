import {Injectable} from '@angular/core';

export enum GridBreakpoint {
  SM = 'SM',
  MD = 'MD',
  LG = 'LG',
  XL = 'XL',
  XXL = 'XXL'
}

@Injectable({
  providedIn: 'root'
})
export class WindowSizeService {
  private gridBreakpoints = {
    [GridBreakpoint.SM]: 576,
    [GridBreakpoint.MD]: 768,
    [GridBreakpoint.LG]: 992,
    [GridBreakpoint.XL]: 1200,
    [GridBreakpoint.XXL]: 1320
  };

  get windowInnerWidth(): number {
    return window.innerWidth;
  }

  get isXxl(): boolean {
    return this.windowInnerWidth <= this.gridBreakpoints[GridBreakpoint.XXL];
  }
  get isXl(): boolean {
    return this.windowInnerWidth <= this.gridBreakpoints[GridBreakpoint.XL];
  }
  get isLg(): boolean {
    return this.windowInnerWidth <= this.gridBreakpoints[GridBreakpoint.LG];
  }
  get isMd(): boolean {
    return this.windowInnerWidth <= this.gridBreakpoints[GridBreakpoint.MD];
  }
  get isSm(): boolean {
    return this.windowInnerWidth <= this.gridBreakpoints[GridBreakpoint.SM];
  }
}
