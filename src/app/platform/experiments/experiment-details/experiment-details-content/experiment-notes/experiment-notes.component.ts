import {AfterViewInit, Component, ElementRef, Input, OnDestroy, OnInit, QueryList, ViewChild, ViewChildren} from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {RESIZABLE_BOX} from '../../../../platform-shared/components/resizable-box/resizable-box.token';
import {ExperimentDetailsService} from '../../experiment-details.service';
import {Experiment} from '../../../models/experiment.interface';
import {BehaviorSubject, Subscription} from 'rxjs';
import {filter, switchMap} from 'rxjs/operators';
import {Note} from '../../models/note.interface';
import {ToastrService} from 'ngx-toastr';
import {AuthTokenService} from 'ngx-api-utils';
import {JwtTokenPayload} from '../../../../../core/auth/jwt-token-payload';
import * as moment from 'moment';

@Component({
  selector: 'co-experiment-notes',
  templateUrl: './experiment-notes.component.html',
  styleUrls: ['./experiment-notes.component.scss'],
  providers: [
    {
      provide: RESIZABLE_BOX,
      useExisting: ExperimentNotesComponent
    }
  ]
})
export class ExperimentNotesComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('notesWrapperRef', {static: true})
  notesWrapper: ElementRef;
  @ViewChild('notesScrollContainerRef', {static: true})
  notesScrollContainer: ElementRef;
  @ViewChildren('noteRef')
  noteRef: QueryList<any>;
  @Input()
  set experiment(experiment: Experiment) {
    this.experiment$.next(experiment);
  }
  get experiment(): Experiment | undefined {
    return this.experiment$.value;
  }

  notesForm = this.fb.group({
    note: [null]
  });
  notes: Note[] = [];
  createNoteLoading = false;
  loading = true;
  showNoteActionButtons = false;
  private experiment$ = new BehaviorSubject<Experiment>(undefined);
  private subscriptions = new Subscription();

  constructor(
    private fb: FormBuilder,
    private experimentDetailsService: ExperimentDetailsService,
    private toastr: ToastrService,
    private authToken: AuthTokenService<JwtTokenPayload>
  ) {}

  ngOnInit(): void {
    this.subscriptions.add(
      this.experiment$
        .pipe(
          filter(e => !!e),
          switchMap(({id}) => this.experimentDetailsService.getNotes(id))
        )
        .subscribe(
          (notes: any) => {
            this.notes = notes;
            this.loading = false;
          },
          () => {
            this.toastr.error('Notes could not load!');
            this.loading = false;
          }
        )
    );
  }

  ngAfterViewInit(): void {
    this.subscriptions.add(
      this.noteRef.changes.subscribe(() => {
        this.notesWrapper.nativeElement.scrollTop = this.notesScrollContainer.nativeElement.scrollHeight;
      })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  clearNoteInput(): void {
    this.notesForm.reset();
    this.showNoteActionButtons = false;
  }

  showActionNoteActionButtons(): void {
    this.showNoteActionButtons = true;
  }

  onSubmit(): void {
    if (!this.notesForm.value.note) {
      return;
    }

    const noteReq: Note = {
      datetime: new Date().toISOString(),
      notes: this.notesForm.value.note.trim(),
      experimentId: `/experiments/${this.experiment.id}`,
      userid: this.authToken.payload.uid
    };
    this.createNoteLoading = true;

    this.experimentDetailsService.createNote(noteReq).subscribe(
      note => {
        this.createNoteLoading = false;
        this.clearNoteInput();
        this.notes.push(note);
      },
      () => {
        this.toastr.error('Could not submit the note!');
        this.createNoteLoading = false;
      }
    );
  }

  formatDate(date: string): string {
    const newDate = moment(date).format('MMM DD, YYYY hh:mm:ss');
    return newDate;
  }
}
