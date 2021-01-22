import {Component, ViewChild, ElementRef, AfterViewInit, Output, EventEmitter, OnInit} from '@angular/core';
import {NgxSmoothScrollService} from '@eunsatio/ngx-smooth-scroll';
import {SelectedDate} from '../selected-date.interface';
import {ScrollProperty} from '../scroll-property-interface';

@Component({
  selector: 'co-journal-calendar-filter',
  templateUrl: './journal-calendar-filter.component.html',
  styleUrls: ['./journal-calendar-filter.component.scss']
})
export class JournalCalendarFilterComponent implements OnInit {
  @ViewChild('basicScroll', {static: true}) basicScrollElRef: ElementRef;
  @Output() selectDate = new EventEmitter();

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
  selected: SelectedDate;

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
      stopOnArrival: false
    }
  };

  constructor(private smoothScroll: NgxSmoothScrollService) {}

  ngOnInit(): void {}
  choseDate(date: SelectedDate): void {
    this.selected = date;
    this.selected.selected = !this.selected.selected;
    this.selectDate.emit(this.selected);
  }
  showAll(): void {
    this.selectDate.emit('');
    this.selected.selected = false;
  }
  scrollDown(): void {
    if (this.directive.nth === this.basicScrollElRef.nativeElement.childElementCount - 1) {
      return;
    }
    this.directive.nth += 1;
    this.smoothScroll.scrollToIndex(this.basicScrollElRef.nativeElement, '.scroll-content', this.directive.nth, this.directive.options);
  }
  scrollUp(): void {
    if (this.directive.nth === 0) {
      return;
    }
    this.directive.nth -= 1;
    this.smoothScroll.scrollToIndex(this.basicScrollElRef.nativeElement, '.scroll-content', this.directive.nth, this.directive.options);
  }
}
