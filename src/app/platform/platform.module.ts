import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PlatformRoutingModule} from './platform-routing.module';
import {SharedModule} from '../shared/shared.module';
import {PlatformLayoutModule} from './platform-layout/platform-layout.module';

@NgModule({
  declarations: [],
  imports: [CommonModule, SharedModule, PlatformRoutingModule, PlatformLayoutModule]
})
export class PlatformModule {}
