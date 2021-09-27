import {formatDate} from '@angular/common';
import {Component, EventEmitter, Input, OnInit, Output, SimpleChanges, ViewChild, ViewEncapsulation} from '@angular/core';
import {ColumnMode} from '@swimlane/ngx-datatable';
import {ToastrService} from 'ngx-toastr';
import {finalize} from 'rxjs/operators';
import {AuthService} from 'src/app/auth/auth.service';
import {WindowSizeService} from 'src/app/core/utils/window-size.service';
import {Page} from 'src/app/platform/journal/models/page.interface';
import {ConfirmModalComponent} from 'src/app/platform/platform-shared/components/confirm-modal/confirm-modal.component';
import {User} from 'src/app/platform/teams/model/team.interface';
import {UserDropDown} from '../../../manage-users.interface';

@Component({
  selector: 'co-users-table',
  templateUrl: './users-table.component.html',
  styleUrls: ['./users-table.component.scss']
})
export class UsersTableComponent implements OnInit {
  @ViewChild('confirmModalRef', {static: true})
  confirmModal: ConfirmModalComponent;
  @Input()
  userList: User[];

  @Input()
  userRoles: UserDropDown[];

  @Output()
  changePage = new EventEmitter<Page>();

  @Output()
  userDeleted = new EventEmitter<User>();

  page: Page = {
    size: 10,
    pageNumber: 0
  };
  loading = false;
  ColumnMode = ColumnMode;
  roleList: UserDropDown[];
  currentUser: User;
  columns = [
    {
      canAutoResize: true,
      draggable: false,
      resizeable: true,
      headerCheckboxable: false,
      checkboxable: false,
      sortable: false,
      flexGrow: 2,
      prop: 'roles',
      name: 'Type',
      minWidth: 270,
      defaultValue: (type: string) => this.getTypeName(type)
    },
    {
      canAutoResize: true,
      draggable: false,
      resizeable: true,
      headerCheckboxable: false,
      checkboxable: false,
      sortable: false,
      flexGrow: 1,
      prop: 'lastActivity',
      name: 'Last Activity',
      defaultValue: (date: string) => this.fomatDate(date)
    }
  ];

  constructor(private windowSizeService: WindowSizeService, private authService: AuthService, private toastr: ToastrService) {}

  ngOnInit(): void {}

  fomatDate(date: string): string {
    if (date) {
      return formatDate(date, 'yyyy-MM-dd', 'en-US');
    } else {
      return '';
    }
  }

  getTypeName(type: string): string {
    let typeName = '';
    this.userRoles.map(item => {
      if (item.name === type[0]) {
        typeName = item.label;
        return;
      }
    });
    return typeName;
  }

  setPage(pageInfo: any): void {
    this.page.pageNumber = pageInfo.offset;
    this.changePage.emit(this.page);
  }

  get hideColumns(): boolean {
    return this.windowSizeService.isLg;
  }

  removeUser(userItem: User): void {
    this.confirmModal.openModal(userItem.email);
    this.currentUser = userItem;
  }

  onDeleteConfirm(): void {
    this.loading = true;
    this.authService
      .removeUser(this.currentUser.userid)
      .pipe(
        finalize(() => {
          this.loading = false;
          this.confirmModal.onModalClose();
        })
      )
      .subscribe(
        () => {
          this.toastr.success(`${this.currentUser.email} has been successfully deleted`);
          this.userDeleted.emit(this.currentUser);
        },
        () => {
          this.toastr.error(`Can not delete ${this.currentUser.email}`);
        }
      );
  }
}
