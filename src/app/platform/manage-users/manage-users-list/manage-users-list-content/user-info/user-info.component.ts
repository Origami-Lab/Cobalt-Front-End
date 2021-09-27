import {Component, Input, OnInit, SimpleChanges} from '@angular/core';
import {User} from 'src/app/platform/teams/model/team.interface';

@Component({
  selector: 'co-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.scss']
})
export class UserInfoComponent implements OnInit {
  @Input()
  userItem: User;

  userInfo: User;
  constructor() {}
  ngOnChanges(changes: SimpleChanges): void {
    if (changes) {
      this.userInfo = changes['userItem'].currentValue;
    }
  }
  ngOnInit(): void {}
}
