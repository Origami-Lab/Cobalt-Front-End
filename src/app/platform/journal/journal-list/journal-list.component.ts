import {SelectedDate} from './../selected-date.interface';
import {Component, OnInit, ViewChild, AfterViewInit, ElementRef, OnDestroy} from '@angular/core';
import {fromEvent, BehaviorSubject, Subscription} from 'rxjs';
import {debounceTime, map, switchMap} from 'rxjs/operators';
import {ColumnMode} from '@swimlane/ngx-datatable';
import {JournalsService} from '../journals.service';
import {Experiment} from '../../experiments/models/experiment.interface';
import {formatDate} from '@angular/common';
import {Page} from '../page.interface';
import {PageDefaultParams} from '../page-default-params.interface';

@Component({
  selector: 'co-journal-list',
  templateUrl: './journal-list.component.html',
  styleUrls: ['./journal-list.component.scss']
})
export class JournalListComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('search', {static: false}) search: ElementRef;
  ColumnMode = ColumnMode;
  temp: Experiment[] = [];
  journals: Experiment[] = [];
  page: Page = {
    size: 10,
    pageNumber: 0
  };
  searchParam = '';
  selectedDate: SelectedDate = undefined;
  private defaultParams: PageDefaultParams = {
    searchParam: this.searchParam,
    selectedDate: this.selectedDate,
    pageNumber: this.page.pageNumber
  };
  private queryParams$ = new BehaviorSubject<PageDefaultParams>(this.defaultParams);
  private subscriptions: Subscription = new Subscription();

  columns = [
    {prop: 'title', name: 'Experiment', width: 600},
    {prop: 'startDate', name: 'Created', width: 180, defaultValue: (date: string) => formatDate(date, 'yyyy-MM-dd', 'en-US')}
  ];

  constructor(private journalsService: JournalsService) {}

  ngOnInit(): void {
    this.subscriptions.add(
      this.queryParams$
        .pipe(
          switchMap(params => {
            return this.journalsService.getExperiments(params.pageNumber + 1, params.searchParam, params.selectedDate);
          })
        )
        .subscribe((journals: Experiment[]) => {
          this.journals = journals;
          this.temp = [...journals];
        })
    );
  }
  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  ngAfterViewInit(): void {
    this.subscriptions.add(
      fromEvent(this.search.nativeElement, 'keydown')
        .pipe(
          debounceTime(550),
          map((searchInput: {target: HTMLInputElement}) => searchInput.target.value)
        )
        .subscribe(value => {
          this.updateFilter(value);
        })
    );
  }

  setPage(pageInfo): void {
    this.page.pageNumber = pageInfo.offset;
    this.getExperimentPage();
  }

  handleSelectDate(selectedDate: SelectedDate): void {
    this.page.pageNumber = 0;
    this.selectedDate = selectedDate;
    this.getExperimentPage();
  }

  updateFilter(val: string): void {
    this.page.pageNumber = 0;
    const value = val.toString().toLowerCase().trim();
    this.searchParam = value;
    this.getExperimentPage();
  }

  getExperimentPage(): void {
    this.queryParams$.next({
      searchParam: this.searchParam,
      selectedDate: this.selectedDate,
      pageNumber: this.page.pageNumber
    });
  }
}
