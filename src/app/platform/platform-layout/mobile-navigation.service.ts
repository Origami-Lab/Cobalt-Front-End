import {Inject, Injectable} from '@angular/core';
import {DOCUMENT} from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class MobileNavigationService {
  private _isNavigationVisible = false;

  set navigationVisibility(visibility: boolean) {
    this._isNavigationVisible = visibility;
    this._isNavigationVisible
      ? this.document.body.classList.add('overflow-hidden')
      : this.document.body.classList.remove('overflow-hidden');
  }

  get navigationVisibility(): boolean {
    return this._isNavigationVisible;
  }
  constructor(@Inject(DOCUMENT) private document: Document) {}
}
