import {Component, OnInit} from '@angular/core';
import {Page} from '../../journal/models/page.interface';
import {User} from '../../teams/model/team.interface';
import {TeamsService} from '../../teams/teams.service';

@Component({
  selector: 'co-manage-users-list',
  templateUrl: './manage-users-list.component.html',
  styleUrls: ['./manage-users-list.component.scss']
})
export class ManageUsersListComponent implements OnInit {
  userList: User[];
  updateNumber = 0;
  keySearch = '';
  roleName = '';
  page: Page = {
    size: 10,
    pageNumber: 0,
    totalItem: 0
  };
  constructor(private teamService: TeamsService) {}

  ngOnInit(): void {
    this.getUserList(this.keySearch, this.roleName, this.page.pageNumber + 1, this.page.size);
  }

  getUserList(search: string, role?: string, page?: number, itemsPerPage?: number): void {
    this.teamService
      .getUser(search, role, page, itemsPerPage)
      .pipe()
      .subscribe(rs => {
        this.userList = rs.body;
      });
  }

  userDeleted(user: User): void {
    this.updateNumber++;
    this.userList = this.userList.filter(item => {
      if (item.userid !== user.userid) {
        return item;
      }
    });
  }

  resetPage(): void {
    this.page = {
      size: 10,
      pageNumber: 0
    };
  }

  search(value): void {
    this.resetPage();
    this.keySearch = value;
    this.getUserList(this.keySearch, this.roleName, this.page.pageNumber + 1, this.page.size);
  }

  itemSelected(dropItem): void {
    this.resetPage();
    this.roleName = dropItem.name;
    this.getUserList(this.keySearch, this.roleName, this.page.pageNumber + 1, this.page.size);
  }

  onUserCreated(): void {
    this.resetPage();
    this.updateNumber++;
    this.getUserList(this.keySearch, this.roleName, this.page.pageNumber + 1, this.page.size);
  }

  onChangePage(page: Page): void {
    this.page = page;
    this.getUserList(this.keySearch, this.roleName, this.page.pageNumber + 1, this.page.size);
  }
}
