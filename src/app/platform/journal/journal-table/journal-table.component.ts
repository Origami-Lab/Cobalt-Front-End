import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {formatDate} from '@angular/common';
import {ColumnMode, DatatableComponent} from '@swimlane/ngx-datatable';
import {Experiment} from '../../experiments/models/experiment.interface';
import {Page} from '../models/page.interface';
import {GridBreakpoint, WindowSizeService} from '../../../core/utils/window-size.service';
import {fromEvent, merge, Subscription} from 'rxjs';
import {debounceTime, filter} from 'rxjs/operators';
import {ExperimentsService} from '../../experiments/experiments.service';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'co-journal-table',
  templateUrl: './journal-table.component.html',
  styleUrls: ['./journal-table.component.scss']
})
export class JournalTableComponent implements OnInit {
  @ViewChild('journalTableRef', {static: true})
  journalTable: DatatableComponent;
  @Input()
  journals: Experiment[];
  @Input()
  loading = true;
  @Output()
  changePage = new EventEmitter<Page>();
  @Output()
  openConfirmModal = new EventEmitter<Experiment>();

  ColumnMode = ColumnMode;
  columns = [
    {
      canAutoResize: true,
      draggable: false,
      resizeable: true,
      headerCheckboxable: false,
      checkboxable: false,
      sortable: false,
      flexGrow: 2,
      prop: 'title',
      name: 'Experiment',
      minWidth: 270
    },
    {
      canAutoResize: true,
      draggable: false,
      resizeable: true,
      headerCheckboxable: false,
      checkboxable: false,
      sortable: false,
      flexGrow: 1,
      prop: 'startDate',
      name: 'Created',
      defaultValue: (date: string) => this.formatJournalDate(date)
    }
  ];
  page: Page = {
    size: 10,
    pageNumber: 0
  };
  private subscription: Subscription;
  formatJournalDate = (date: string) => formatDate(date, 'yyyy-MM-dd', 'en-US');

  get hideColumns(): boolean {
    return this.windowSizeService.isLg;
  }

  constructor(private windowSizeService: WindowSizeService) {}

  ngOnInit(): void {
    this.subscription = merge(
      fromEvent(window, 'resize').pipe(filter(() => !this.windowSizeService[GridBreakpoint.LG])),
      fromEvent(window, 'orientationchange')
    )
      .pipe(debounceTime(300))
      .subscribe(() => {
        this.journalTable.rowDetail.collapseAllRows();
        this.journalTable.recalculate();
      });
  }

  setPage(pageInfo: any): void {
    this.page.pageNumber = pageInfo.offset;
    this.changePage.emit(this.page);
  }

  toggleExpandRow(row): void {
    this.journalTable.rowDetail.toggleExpandRow(row);
  }

  onConfirmModalOpen(experiment: Experiment): void {
    this.openConfirmModal.emit(experiment);
  }
}
