import {Component, EventEmitter, HostListener, Input, OnDestroy, OnInit, Output, ViewChild} from '@angular/core';
import {ModalDirective, ModalOptions} from 'ngx-bootstrap/modal';
import {NEVER, race, Subscription} from 'rxjs';
import {ActivatedRoute, Router} from '@angular/router';
import {CoModalService} from '../co-modal.service';
import {switchMap} from 'rxjs/operators';
import {PlatformLayoutComponent} from '../../../platform/platform-layout/platform-layout/platform-layout.component';
import {UiKitPageComponent} from '../../../ui-kit/ui-kit-page/ui-kit-page.component';

@Component({
  selector: 'co-modal-layout',
  templateUrl: './co-modal-layout.component.html',
  styleUrls: ['./co-modal-layout.component.scss']
})
export class CoModalLayoutComponent implements OnInit, OnDestroy {
  @ViewChild('bsModal', {static: true})
  bsModal: ModalDirective;

  @ViewChild('confirmModal', {static: true})
  confirmModal: ModalDirective;
  confirmModalAnswer: boolean;

  @Input()
  config: ModalOptions = {show: false, backdrop: 'static', class: 'modal-sm', keyboard: false};
  @Input()
  showCloseButton = true;
  @Output()
  close = new EventEmitter<void>();

  @Input()
  set isBlocked(state: boolean) {
    this.svModalService.isBlocked$.next(state);
  }

  private onHideSubscription: Subscription;
  private triggerConfirmModalSubscription: Subscription;

  constructor(private router: Router, private route: ActivatedRoute, private svModalService: CoModalService) {}

  ngOnInit(): void {
    this.triggerConfirmModalSubscription = this.svModalService.onConfirmModalTrigger.subscribe(() => this.onClose());

    this.onHideSubscription = race([
      this.bsModal.onHidden,
      this.confirmModal.onHidden.pipe(
        switchMap(() => {
          if (this.confirmModalAnswer) {
            this.svModalService.isBlocked$.next(false);
            this.bsModal.hide();
          }
          return NEVER;
        })
      )
    ]).subscribe(() => {
      this.close.emit();
      this.closeOutlet();
    });
  }

  ngOnDestroy(): void {
    if (this.onHideSubscription) {
      this.onHideSubscription.unsubscribe();
      this.onHideSubscription = undefined;
    }

    if (this.triggerConfirmModalSubscription) {
      this.triggerConfirmModalSubscription.unsubscribe();
      this.triggerConfirmModalSubscription = undefined;
    }
  }

  @HostListener('keydown.esc', [])
  onEsc(): void {
    if (this.confirmModal.isShown) {
      return;
    }

    this.onClose();
  }

  openModal(): void {
    this.bsModal.show();
  }

  closeModal(): void {
    this.bsModal.hide();
  }

  onClose(forced = false): void {
    if (forced || !this.svModalService.isBlocked$.value) {
      this.svModalService.isBlocked$.next(false); // to be sure that canDeactivate wont be triggered if is true
      this.bsModal.hide();
    } else {
      this.confirmModal.show();
    }
  }

  onConfirm(answer: boolean): void {
    this.confirmModalAnswer = answer;
    this.confirmModal.hide();
  }

  private getPrimaryOutletParent(route: ActivatedRoute): ActivatedRoute {
    if (route.parent.outlet === 'primary') {
      return this.route.parent;
    }
    return this.getPrimaryOutletParent(route.parent);
  }

  private closeOutlet(): void {
    const primaryOutletParent = this.getPrimaryOutletParent(this.route);
    const outletParentLayoutRoute = this.route.pathFromRoot
      .reverse()
      .find(r => [PlatformLayoutComponent, UiKitPageComponent].includes(r.component as any));

    const openedInModalRoute = this.route.pathFromRoot.map(r => r.outlet).includes('modal');

    const targetOutlet = openedInModalRoute ? 'modal' : primaryOutletParent.outlet;
    const relativeTo = openedInModalRoute ? outletParentLayoutRoute : primaryOutletParent.parent;
    this.router.navigate([{outlets: {[targetOutlet]: null}}], {relativeTo});
  }
}
