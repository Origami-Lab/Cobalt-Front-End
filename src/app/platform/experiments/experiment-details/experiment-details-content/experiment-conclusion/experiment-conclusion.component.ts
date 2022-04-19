import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {RESIZABLE_BOX} from '../../../../platform-shared/components/resizable-box/resizable-box.token';
import {ResizableBoxMethods} from '../../../../platform-shared/components/resizable-box/resizable-box.interface';
import {Experiment} from '../../../models/experiment.interface';
import {BehaviorSubject, Subscription} from 'rxjs';
import {ExperimentDetailsService} from '../../experiment-details.service';
import {filter, switchMap} from 'rxjs/operators';
import {TextEditorContentType} from '../../../../platform-shared/components/text-editor/text-editor-content.type';
import {Conclusion} from '../../models/conclusion.interface';
import {ToastrService} from 'ngx-toastr';
import {AuthTokenService} from 'ngx-api-utils';
import {JwtTokenPayload} from '../../../../../core/auth/jwt-token-payload';
import {environment} from 'src/environments/environment';
import * as uuid from 'uuid';
import {HttpClient} from '@angular/common/http';
@Component({
  selector: 'co-experiment-conclusion',
  templateUrl: './experiment-conclusion.component.html',
  styleUrls: ['./experiment-conclusion.component.scss'],
  providers: [
    {
      provide: RESIZABLE_BOX,
      useExisting: ExperimentConclusionComponent
    }
  ]
})
export class ExperimentConclusionComponent implements OnInit, OnDestroy, ResizableBoxMethods {
  private static conclusionInitialTemplate = '';
  @Input()
  set experiment(experiment: Experiment) {
    this.experiment$.next(experiment);
  }
  get experiment(): Experiment {
    return this.experiment$.value;
  }

  boxContentHeight: number;
  conclusion: Conclusion | Partial<Conclusion>;
  loading = true;
  saveConclusionLoading = false;
  private experiment$ = new BehaviorSubject<Experiment>(undefined);
  private subscription: Subscription;
  iframeURL = '';

  constructor(
    private experimentDetailsService: ExperimentDetailsService,
    private toastr: ToastrService,
    private authToken: AuthTokenService<JwtTokenPayload>,
    private http: HttpClient
  ) {}

  isOldEditor: boolean = false;

  @Output()
  checkEditor = new EventEmitter<void>();

  ngOnInit(): void {
    this.subscription = this.experiment$
      .pipe(
        filter(e => !!e),
        switchMap(experiment => this.experimentDetailsService.getConclusion(experiment.id))
      )
      .subscribe(
        (conclusion: Conclusion) => {
          this.conclusion = conclusion ? conclusion : {conclusions: ExperimentConclusionComponent.conclusionInitialTemplate};
          this.loading = false;
          if (conclusion && conclusion.conclusions) {
            this.isOldEditor = true;
            this.checkEditor.emit();
          } else {
            if (!this.conclusion.padid) {
              this.createGroupPad(conclusion);
            } else {
              this.iframeURL = `https://etherpad.cobalt.origamilab.ch/p/${
                this.conclusion.padid
              }?showChat=true&userName=${localStorage.getItem('userName')}`;
            }
          }
        },
        () => {
          this.loading = true;
          this.toastr.error('Conclusion could not load!');
        }
      );
  }

  createGroupPad(conclusion: Conclusion): void {
    const options = {
      withCredentials: false
    };

    const params = {
      groupID: environment.padGroupId,
      padName: uuid.v4(),
      text: decodeURI(conclusion ? (conclusion.conclusions as string) : ''),
      apikey: environment.apiKey
    };
    this.http.post(`${environment.padUrl}createGroupPad`, params, options).subscribe((rs: any) => {
      if (conclusion) {
        this.updateConclusion(rs.data.padID, conclusion.id);
        this.setHtml(rs.data.padID, conclusion.conclusions as string);
      } else {
        this.save(rs.data.padID);
      }
      this.iframeURL = `https://etherpad.cobalt.origamilab.ch/p/${rs.data.padID}?showChat=true&userName=${localStorage.getItem(
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

  updateConclusion(padid: string, id: number): void {
    this.experimentDetailsService.updateConclusion({id, padid}).subscribe(() => {});
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    this.conclusion = undefined;
  }

  onChange(editorContent: TextEditorContentType): void {
    this.conclusion.conclusions = editorContent;
  }

  setBoxContentHeight(boxContentHeight: number): void {
    this.boxContentHeight = boxContentHeight;
  }

  save(padid?: string): void {
    this.saveConclusionLoading = true;
    const conclusionReq: Conclusion = this.conclusion.id
      ? ({...this.conclusion} as Conclusion)
      : ({
          datetime: new Date().toISOString(),
          conclusions: this.conclusion.conclusions,
          experimentId: `/experiments/${this.experiment.id}`,
          userid: this.authToken.payload.uid,
          padid
        } as Conclusion);

    this.experimentDetailsService.updateConclusion(conclusionReq).subscribe(
      () => {
        this.saveConclusionLoading = false;
        this.toastr.success('Conclusion has been saved!');
      },
      () => {
        this.saveConclusionLoading = false;
        this.toastr.error('Could not submit the conclusion!');
      }
    );
  }
}
