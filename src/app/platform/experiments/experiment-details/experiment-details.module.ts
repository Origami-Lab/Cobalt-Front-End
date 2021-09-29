import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ExperimentDetailsPageComponent} from './experiment-details-page/experiment-details-page.component';
import {ExperimentDetailsSideNavComponent} from './experiment-details-side-nav/experiment-details-side-nav.component';
import {ExperimentDetailsHeaderComponent} from './experiment-details-header/experiment-details-header.component';
import {ExperimentDetailsContentComponent} from './experiment-details-content/experiment-details-content.component';
import {ExperimentLinkUploadComponent} from './experiment-details-side-nav/experiment-link-upload/experiment-link-upload.component';
import {SharedModule} from '../../../shared/shared.module';
import {ExperimentProtocolComponent} from './experiment-details-content/experiment-protocol/experiment-protocol.component';
import {ExperimentNotesComponent} from './experiment-details-content/experiment-notes/experiment-notes.component';
import {ExperimentConclusionComponent} from './experiment-details-content/experiment-conclusion/experiment-conclusion.component';
import {ExperimentDetailsRoutingModules} from './experiment-details-routing.modules';
import {ExperimentFileUploadComponent} from './experiment-details-side-nav/experiment-file-upload/experiment-file-upload.component';
import {PlatformSharedModule} from '../../platform-shared/platform-shared.module';
import {TextareaAutosizeModule} from 'ngx-textarea-autosize';
import {ExperimentDetailsSharedModule} from './experiment-details-shared/experiment-details-shared.module';
import {ExperimentLinkUploadModalComponent} from './experiment-details-side-nav/experiment-link-upload-modal/experiment-link-upload-modal.component';
import {CollapseModule} from 'ngx-bootstrap/collapse';
import {ExperimentDetailsTagComponent} from './experiment-details-tag/experiment-details-tag.component';
import {BsDropdownModule} from 'ngx-bootstrap/dropdown';
@NgModule({
  declarations: [
    ExperimentDetailsPageComponent,
    ExperimentDetailsSideNavComponent,
    ExperimentDetailsHeaderComponent,
    ExperimentDetailsContentComponent,
    ExperimentLinkUploadComponent,
    ExperimentProtocolComponent,
    ExperimentNotesComponent,
    ExperimentConclusionComponent,
    ExperimentFileUploadComponent,
    ExperimentLinkUploadModalComponent,
    ExperimentDetailsTagComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    ExperimentDetailsRoutingModules,
    PlatformSharedModule,
    TextareaAutosizeModule,
    ExperimentDetailsSharedModule,
    CollapseModule,
    BsDropdownModule
  ],
  exports: [ExperimentDetailsTagComponent]
})
export class ExperimentDetailsModule {}
