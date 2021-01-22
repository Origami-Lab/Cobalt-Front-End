import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ExperimentDetailsInfoComponent} from './components/experiment-details-info/experiment-details-info.component';
import {AttachmentComponent} from './components/attachment/attachment.component';

@NgModule({
  declarations: [ExperimentDetailsInfoComponent, AttachmentComponent],
  imports: [CommonModule],
  exports: [ExperimentDetailsInfoComponent, AttachmentComponent]
})
export class ExperimentDetailsSharedModule {}
