import {Injectable} from '@angular/core';
import {CanDeactivate} from '@angular/router';
import {CoModalService} from '../../shared/co-modal/co-modal.service';
import {UiKitModalComponent} from './ui-kit-modal.component';

@Injectable({
  providedIn: 'root'
})
export class UiKitModalGuard implements CanDeactivate<UiKitModalComponent> {
  constructor(private coModalService: CoModalService) {}
  canDeactivate(): boolean {
    if (this.coModalService.isBlocked$.value) {
      this.coModalService.triggerConfirmModal();
    }
    return !this.coModalService.isBlocked$.value;
  }
}
