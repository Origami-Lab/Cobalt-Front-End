import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ExperimentRecordModalComponent} from './experiment-record-modal/experiment-record-modal.component';
import {SharedModule} from '../../../shared/shared.module';
import {CoModalModule} from '../../../shared/co-modal/co-modal.module';
import {ExperimentRecordRoutingModule} from './experiment-record-routing.module';
import {ExperimentDetailsSharedModule} from '../experiment-details/experiment-details-shared/experiment-details-shared.module';
import {PlatformSharedModule} from '../../platform-shared/platform-shared.module';

@NgModule({
  declarations: [ExperimentRecordModalComponent],
  imports: [CommonModule, PlatformSharedModule, SharedModule, CoModalModule, ExperimentRecordRoutingModule, ExperimentDetailsSharedModule]
})
export class ExperimentRecordModule {}
