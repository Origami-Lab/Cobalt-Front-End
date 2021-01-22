import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {RESIZABLE_BOX} from '../../../../platform-shared/components/resizable-box/resizable-box.token';
import {ResizableBoxMethods} from '../../../../platform-shared/components/resizable-box/resizable-box.interface';
import {TextEditorContentType} from '../../../../platform-shared/components/text-editor/text-editor-content.type';
import {ExperimentDetailsService} from '../../experiment-details.service';
import {Experiment} from '../../../models/experiment.interface';
import {BehaviorSubject, Subscription} from 'rxjs';
import {filter, switchMap} from 'rxjs/operators';
import {Protocol} from '../../models/protocol.interface';
import {ToastrService} from 'ngx-toastr';
import {AuthTokenService} from 'ngx-api-utils';
import {JwtTokenPayload} from '../../../../../core/auth/jwt-token-payload';

@Component({
  selector: 'co-experiment-protocol',
  templateUrl: './experiment-protocol.component.html',
  styleUrls: ['./experiment-protocol.component.scss'],
  providers: [
    {
      provide: RESIZABLE_BOX,
      useExisting: ExperimentProtocolComponent
    }
  ]
})
export class ExperimentProtocolComponent implements OnInit, OnDestroy, ResizableBoxMethods {
  private static protocolInitialTemplate: Partial<Protocol> = {
    protocol: '<h2><strong>Protocol</strong></h2>'
  };
  @Input()
  set experiment(experiment: Experiment) {
    this.experiment$.next(experiment);
  }
  get experiment(): Experiment {
    return this.experiment$.value;
  }

  boxContentHeight: number;
  protocol: Protocol | Partial<Protocol>;
  loading = true;
  saveProtocolLoading = false;
  private experiment$ = new BehaviorSubject<Experiment>(undefined);
  private subscription: Subscription;

  constructor(
    private experimentDetailsService: ExperimentDetailsService,
    private toastr: ToastrService,
    private authToken: AuthTokenService<JwtTokenPayload>
  ) {}

  ngOnInit(): void {
    this.subscription = this.experiment$
      .pipe(
        filter(e => !!e),
        switchMap(experiment => this.experimentDetailsService.getProtocol(experiment.id))
      )
      .subscribe(
        (protocol: Protocol) => {
          this.protocol = protocol || ExperimentProtocolComponent.protocolInitialTemplate;
          this.loading = false;
        },
        () => {
          this.loading = true;
          this.toastr.error('Protocol could not load!');
        }
      );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  onChange(editorContent: TextEditorContentType): void {
    this.protocol.protocol = editorContent;
  }

  setBoxContentHeight(boxContentHeight: number): void {
    this.boxContentHeight = boxContentHeight;
  }

  save(): void {
    this.saveProtocolLoading = true;
    const protocolReq: Protocol = this.protocol.id
      ? ({...this.protocol, experimentId: `/experiments/${this.experiment.id}`} as Protocol)
      : ({
          datetime: new Date().toISOString(),
          protocol: this.protocol.protocol,
          experimentId: `/experiments/${this.experiment.id}`,
          userid: this.authToken.payload.uid
        } as Protocol);

    this.experimentDetailsService.updateProtocol(protocolReq).subscribe(
      () => {
        this.saveProtocolLoading = false;
      },
      () => {
        this.saveProtocolLoading = false;
        this.toastr.error('Could not submit the protocol!');
      }
    );
  }
}
