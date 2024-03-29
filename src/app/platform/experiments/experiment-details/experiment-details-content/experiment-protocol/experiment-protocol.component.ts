import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
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
import {HttpClient} from '@angular/common/http';
import {environment} from 'src/environments/environment';
import md5 from 'md5-hash';
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
  private static protocolInitialTemplate = '';
  @Input()
  set experiment(experiment: Experiment) {
    this.experiment$.next(experiment);
  }
  get experiment(): Experiment {
    return this.experiment$.value;
  }

  @Output()
  checkEditor = new EventEmitter<void>();

  boxContentHeight: number;
  protocol: Protocol | Partial<Protocol>;
  loading = true;
  saveProtocolLoading = false;
  private experiment$ = new BehaviorSubject<Experiment>(undefined);
  private subscription: Subscription;

  constructor(
    private experimentDetailsService: ExperimentDetailsService,
    private toastr: ToastrService,
    private authToken: AuthTokenService<JwtTokenPayload>,
    private http: HttpClient
  ) {}

  iframeURL = '';
  isOldEditor = false;

  ngOnInit(): void {
    this.subscription = this.experiment$
      .pipe(
        filter(e => !!e),
        switchMap(experiment => this.experimentDetailsService.getProtocol(experiment.id))
      )
      .subscribe(
        (protocol: Protocol) => {
          this.protocol = protocol ? protocol : {protocol: ExperimentProtocolComponent.protocolInitialTemplate};
          this.loading = false;
          if (protocol && protocol.protocol) {
            this.isOldEditor = true;
            this.checkEditor.emit();
          } else {
            if (!this.protocol.padid) {
              this.createGroupPad(protocol);
            } else {
              this.iframeURL = `https://etherpad.cobalt.origamilab.ch/p/${
                this.protocol.padid
              }?showChat=false&userName=${localStorage.getItem('userName')}`;
            }
          }
        },
        () => {
          this.loading = true;
          this.toastr.error('Protocol could not load!');
        }
      );
  }

  createGroupPad(protocol: Protocol): void {
    const options = {
      withCredentials: false
    };

    const params = {
      groupID: environment.padGroupId,
      padName: md5(new Date().getTime().toString()),
      text: decodeURI(protocol ? (protocol.protocol as string) : ''),
      apikey: environment.apiKey
    };
    this.http.post(`${environment.padUrl}createGroupPad`, params, options).subscribe((rs: any) => {
      if (protocol) {
        this.updateProtocal(rs.data.padID, protocol.id);
        this.setHtml(rs.data.padID, protocol.protocol as string);
      } else {
        this.save(rs.data.padID as string);
      }
      this.iframeURL = `https://etherpad.cobalt.origamilab.ch/p/${rs.data.padID}?showChat=false&userName=${localStorage.getItem(
        'userName'
      )}`;
    });
  }

  setHtml(padID: string, html: string): void {
    const options = {
      withCredentials: false
    };

    const params = {
      padID,
      html,
      apikey: environment.apiKey
    };
    this.http.post(`${environment.padUrl}setHTML`, params, options).subscribe((rs: any) => {});
  }

  updateProtocal(padid: string, id: number): void {
    this.experimentDetailsService.updateProtocol({id, padid}).subscribe(() => {});
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    this.protocol = null;
  }

  onChange(editorContent: TextEditorContentType): void {
    this.protocol.protocol = editorContent;
  }

  setBoxContentHeight(boxContentHeight: number): void {
    this.boxContentHeight = boxContentHeight;
  }

  save(padid?: string): void {
    this.saveProtocolLoading = true;
    const protocolReq: Protocol = this.protocol.id
      ? ({...this.protocol, experimentId: `/experiments/${this.experiment.id}`} as Protocol)
      : ({
          datetime: new Date().toISOString(),
          protocol: this.protocol.protocol,
          experimentId: `/experiments/${this.experiment.id}`,
          userid: this.authToken.payload.uid,
          padid
        } as Protocol);

    this.experimentDetailsService.updateProtocol(protocolReq).subscribe(
      () => {
        this.saveProtocolLoading = false;
        this.toastr.success('Protocol has been saved!');
      },
      () => {
        this.saveProtocolLoading = false;
        this.toastr.error('Could not submit the protocol!');
      }
    );
  }
}
