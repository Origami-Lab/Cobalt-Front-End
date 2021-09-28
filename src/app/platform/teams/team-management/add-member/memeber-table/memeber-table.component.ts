import {Component, Input, OnChanges, OnInit, SimpleChanges, ViewEncapsulation} from '@angular/core';
import {ColumnMode} from '@swimlane/ngx-datatable';
import {Page} from 'src/app/platform/journal/models/page.interface';
import {User} from '../../../model/team.interface';

@Component({
  selector: 'co-memeber-table',
  templateUrl: './memeber-table.component.html',
  styleUrls: ['./memeber-table.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class MemeberTableComponent implements OnInit, OnChanges {
  @Input()
  userList: User[];
  @Input()
  loading: boolean;
  userInvitedList: User[];

  ColumnMode = ColumnMode;
  page: Page = {
    pageNumber: 1,
    size: 1000,
    totalItem: 1000
  };
  constructor() {}

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes && changes.userList) {
      this.userInvitedList = changes.userList.currentValue;
    }
  }

  setPage(pageInfo: any): void {
    this.page.pageNumber = pageInfo.offset;
  }
}
