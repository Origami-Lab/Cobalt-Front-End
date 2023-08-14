import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PlatformLayoutComponent} from './platform-layout/platform-layout.component';
import {SharedModule} from '../../shared/shared.module';
import {PlatformHeaderComponent} from './platform-header/platform-header.component';
import {BsDropdownModule} from 'ngx-bootstrap/dropdown';
import {NavComponent} from './nav/nav.component';
import {PipeModule} from 'src/app/shared/pipe.module';
import {KetcherModalComponent} from './platform-header/ketcher-modal/ketcher-modal.component';
import {CoModalModule} from '../../shared/co-modal/co-modal.module';

@NgModule({
  declarations: [PlatformLayoutComponent, PlatformHeaderComponent, NavComponent, KetcherModalComponent],
  exports: [PlatformLayoutComponent],
  imports: [CommonModule, SharedModule, BsDropdownModule, PipeModule, CoModalModule]
})
export class PlatformLayoutModule {}
