import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Subject} from 'rxjs';
import {debounceTime, distinctUntilChanged} from 'rxjs/operators';
import {AuthService} from 'src/app/auth/auth.service';
import {Page} from 'src/app/platform/journal/models/page.interface';
import {User} from 'src/app/platform/teams/model/team.interface';
import {UserDropDown} from '../../manage-users.interface';

@Component({
  selector: 'co-manage-users-list-content',
  templateUrl: './manage-users-list-content.component.html',
  styleUrls: ['./manage-users-list-content.component.scss']
})
export class ManageUsersListContentComponent implements OnInit {
  keySearch: string;
  inputChange = new Subject<string>();

  @Input()
  userList: User[];

  @Input()
  page: Page;

  @Output()
  userDeleted = new EventEmitter<User>();

  @Output()
  search = new EventEmitter<string>();

  @Output()
  itemSelected = new EventEmitter<UserDropDown>();

  @Output()
  changePage = new EventEmitter<Page>();

  dropdownList: UserDropDown[];
  constructor(private authService: AuthService) {
    this.inputChange.pipe(debounceTime(500), distinctUntilChanged()).subscribe(value => {
      this.search.emit(value);
    });
  }

  ngOnInit(): void {
    this.getUserRoles();
  }

  onItemSelected(dropItem: UserDropDown): void {
    this.itemSelected.emit(dropItem);
  }

  getUserRoles(): void {
    this.authService
      .getUserRoles()
      .pipe()
      .subscribe((rs: UserDropDown[]) => {
        this.dropdownList = rs;
      });
  }

  onUserDelete(user: User): void {
    this.userDeleted.emit(user);
  }

  searchDebounce($event: string): void {
    this.inputChange.next($event);
  }

  onChangePage(page: Page): void {
    this.changePage.emit(page);
  }
}
