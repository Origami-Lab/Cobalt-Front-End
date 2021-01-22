import {Injectable} from '@angular/core';
import {BehaviorSubject, Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CoModalService {
  onConfirmModalTrigger: Subject<undefined> = new Subject();
  isBlocked$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  triggerConfirmModal(): void {
    this.onConfirmModalTrigger.next(undefined);
  }
}
