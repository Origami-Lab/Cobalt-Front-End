import {ExperimentsListComponent} from './experiments-list/experiments-list.component';
import {TabsModule} from 'ngx-bootstrap/tabs';
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ExperimentsPageComponent} from './experiments-page/experiments-page.component';
import {SharedModule} from '../../shared/shared.module';
import {ExperimentsRoutingModule} from './experiments-routing.module';
import {PlatformSharedModule} from '../platform-shared/platform-shared.module';
import {ExperimentsViewComponent} from './experiments-list/experiments-views/experiments-views.component';

@NgModule({
  declarations: [ExperimentsPageComponent, ExperimentsListComponent, ExperimentsViewComponent],
  imports: [CommonModule, SharedModule, ExperimentsRoutingModule, TabsModule, PlatformSharedModule]
})
export class ExperimentsModule {}
