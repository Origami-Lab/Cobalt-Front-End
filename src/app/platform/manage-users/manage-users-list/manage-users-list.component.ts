import {Component, OnInit} from '@angular/core';
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
  constructor(private teamService: TeamsService) {}

  ngOnInit(): void {
    this.getUserList(this.keySearch);
  }

  getUserList(search: string, role?: string): void {
    this.teamService
      .getUser(search, role)
      .pipe()
      .subscribe((rs: User[]) => {
        this.userList = rs;
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

  search(value): void {
    this.keySearch = value;
    this.getUserList(value, this.roleName);
  }

  itemSelected(dropItem): void {
    this.roleName = dropItem.name;
    this.getUserList(this.keySearch, dropItem.name);
  }

  onUserCreated(): void {
    this.updateNumber++;
    this.getUserList(this.keySearch, this.roleName);
  }
}
