import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PlatformLayoutComponent} from './platform-layout/platform-layout.component';
import {SharedModule} from '../../shared/shared.module';
import {PlatformHeaderComponent} from './platform-header/platform-header.component';
import {BsDropdownModule} from 'ngx-bootstrap/dropdown';
import {NavComponent} from './nav/nav.component';

@NgModule({
  declarations: [PlatformLayoutComponent, PlatformHeaderComponent, NavComponent],
  imports: [CommonModule, SharedModule, BsDropdownModule],
  exports: [PlatformLayoutComponent]
})
export class PlatformLayoutModule {}
