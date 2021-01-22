import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CoModalLayoutComponent} from './co-modal-layout/co-modal-layout.component';
import {ModalModule} from 'ngx-bootstrap/modal';

@NgModule({
  imports: [CommonModule, ModalModule],
  declarations: [CoModalLayoutComponent],
  exports: [CoModalLayoutComponent]
})
export class CoModalModule {}
