import {Component, ViewChild, ElementRef, AfterViewInit, Output, EventEmitter, OnInit} from '@angular/core';
import {NgxSmoothScrollService} from '@eunsatio/ngx-smooth-scroll';
import {SelectedDate} from '../models/selected-date.interface';
import {ScrollProperty} from '../models/scroll-property-interface';
import {CalendarScrollPosition} from '../models/calendar-scroll-position.enum';

@Component({
  selector: 'co-journal-calendar-filter',
  templateUrl: './journal-calendar-filter.component.html',
  styleUrls: ['./journal-calendar-filter.component.scss']
})
export class JournalCalendarFilterComponent implements OnInit {
  @ViewChild('basicScroll', {static: true})
  basicScrollElRef: ElementRef;
  @Output()
  selectDate = new EventEmitter();

  dates = [
    {month: 'JAN', year: '2021', selected: false, monthNumber: '02', after: '01'},
    {month: 'FEB', year: '2021', selected: false, monthNumber: '03', after: '02'},
    {month: 'MAR', year: '2021', selected: false, monthNumber: '04', after: '03'},
    {month: 'APR', year: '2021', selected: false, monthNumber: '05', after: '04'},
    {month: 'MAY', year: '2021', selected: false, monthNumber: '06', after: '05'},
    {month: 'JUN', year: '2021', selected: false, monthNumber: '07', after: '06'},
    {month: 'JUL', year: '2021', selected: false, monthNumber: '08', after: '07'},
    {month: 'AUG', year: '2021', selected: false, monthNumber: '09', after: '08'},
    {month: 'SEP', year: '2021', selected: false, monthNumber: '10', after: '09'},
    {month: 'OCT', year: '2021', selected: false, monthNumber: '11', after: '10'},
    {month: 'NOV', year: '2021', selected: false, monthNumber: '12', after: '11'},
    {month: 'DEC', year: '2021', selected: false, monthNumber: '13', after: '12'}
  ];

  currentDate: SelectedDate;

  groups = this.dates.reduce((acc, curr) => {
    if (acc.length === 0) {
      acc.push([curr]);
    } else {
      if (acc[acc.length - 1].length < 4) {
        acc[acc.length - 1].push(curr);
      } else {
        acc.push([curr]);
      }
    }
    return acc;
  }, []);

  directive: ScrollProperty = {
    nth: 0,
    options: {
      duration: 700,
      timingFunction: '.13, 1.07, .51, 1.29',
      alignX: 'center',
      alignY: 'center',
      stopOnArrival: true
    }
  };
  CalendarScrollPosition = CalendarScrollPosition;

  constructor(private smoothScroll: NgxSmoothScrollService) {}

  ngOnInit(): void {}

  choseDate(date: SelectedDate): void {
    if (this.currentDate && this.currentDate.month === date.month && this.currentDate.year === date.year) {
      return;
    }
    this.currentDate = date;
    this.currentDate.selected = true;
    this.selectDate.emit(this.currentDate);
  }

  onDropdownDateSelected(e: Event): void {
    const {value} = e.target as any;
    if (!value) {
      return;
    }
    const date = this.dates[value];
    this.choseDate(date);
  }

  showAll(): void {
    this.selectDate.emit(null);
    if (this.currentDate) {
      this.currentDate.selected = false;
    }
  }

  scrollPosition(position: CalendarScrollPosition): void {
    if (
      (position === CalendarScrollPosition.DOWN && this.directive.nth === this.basicScrollElRef.nativeElement.childElementCount - 1) ||
      (position === CalendarScrollPosition.UP && !this.directive.nth)
    ) {
      return;
    }
    this.directive.nth += position === CalendarScrollPosition.UP ? -1 : 1;
    this.smoothScroll.scrollToIndex(this.basicScrollElRef.nativeElement, '.scroll-content', this.directive.nth, this.directive.options);
  }
}
