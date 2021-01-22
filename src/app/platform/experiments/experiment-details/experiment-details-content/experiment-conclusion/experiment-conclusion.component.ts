import {Component, Input, OnDestroy, OnInit} from '@angular/core';
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
  private static conclusionInitialTemplate: Partial<Conclusion> = {
    conclusions: '<h2><strong>Results</strong></h2>'
  };
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

  constructor(
    private experimentDetailsService: ExperimentDetailsService,
    private toastr: ToastrService,
    private authToken: AuthTokenService<JwtTokenPayload>
  ) {}

  ngOnInit(): void {
    this.subscription = this.experiment$
      .pipe(
        filter(e => !!e),
        switchMap(experiment => this.experimentDetailsService.getConclusion(experiment.id))
      )
      .subscribe(
        (conclusion: Conclusion) => {
          this.conclusion = conclusion || ExperimentConclusionComponent.conclusionInitialTemplate;
          this.loading = false;
        },
        () => {
          this.loading = true;
          this.toastr.error('Conclusion could not load!');
        }
      );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  onChange(editorContent: TextEditorContentType): void {
    this.conclusion.conclusions = editorContent;
  }

  setBoxContentHeight(boxContentHeight: number): void {
    this.boxContentHeight = boxContentHeight;
  }

  save(): void {
    this.saveConclusionLoading = true;
    const conclusionReq: Conclusion = this.conclusion.id
      ? ({...this.conclusion} as Conclusion)
      : ({
          datetime: new Date().toISOString(),
          conclusions: this.conclusion.conclusions,
          experimentId: `/experiments/${this.experiment.id}`,
          userid: this.authToken.payload.uid
        } as Conclusion);

    this.experimentDetailsService.updateConclusion(conclusionReq).subscribe(
      () => {
        this.saveConclusionLoading = false;
      },
      () => {
        this.saveConclusionLoading = false;
        this.toastr.error('Could not submit the conclusion!');
      }
    );
  }
}
