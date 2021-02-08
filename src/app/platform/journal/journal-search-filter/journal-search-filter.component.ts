import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {AbstractControl, FormBuilder} from '@angular/forms';
import {Subscription} from 'rxjs';
import {debounceTime, filter} from 'rxjs/operators';

@Component({
  selector: 'co-journal-search-filter',
  templateUrl: './journal-search-filter.component.html',
  styleUrls: ['./journal-search-filter.component.scss']
})
export class JournalSearchFilterComponent implements OnInit, OnDestroy {
  @Input()
  set searchPhrase(phrase: string) {
    this.searchPhraseFormControl.reset(phrase);
  }
  @Output()
  changeSearchPhrase = new EventEmitter<string>();

  searchForm = this.fb.group({
    searchPhrase: [null]
  });

  get searchPhraseFormControl(): AbstractControl {
    return this.searchForm.get('searchPhrase');
  }

  private subscription: Subscription;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.subscription = this.searchPhraseFormControl.valueChanges
      .pipe(
        filter(sp => !!sp && (sp.length >= 3 || sp.length === 0)),
        debounceTime(300)
      )
      .subscribe(this.changeSearchPhrase);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
