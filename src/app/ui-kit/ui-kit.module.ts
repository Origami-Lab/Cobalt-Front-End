import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SharedModule} from '../shared/shared.module';
import {TabsModule} from 'ngx-bootstrap/tabs';
import {BsDropdownModule} from 'ngx-bootstrap/dropdown';
import {UiKitPageComponent} from './ui-kit-page/ui-kit-page.component';
import {UiKitRoutingModule} from './ui-kit-routing.module';
import {PlatformSharedModule} from '../platform/platform-shared/platform-shared.module';
import {CoModalModule} from '../shared/co-modal/co-modal.module';
import {UiKitModalComponent} from './ui-kit-modal/ui-kit-modal.component';

@NgModule({
  declarations: [UiKitPageComponent, UiKitModalComponent],
  imports: [CommonModule, SharedModule, TabsModule, UiKitRoutingModule, BsDropdownModule, PlatformSharedModule, CoModalModule]
})
export class UiKitModule {}
