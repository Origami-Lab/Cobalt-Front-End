import {Component, Input, OnInit} from '@angular/core';
import {MemberShortInfo} from '../model/team.interface';

@Component({
  selector: 'co-member-list',
  templateUrl: './member-list.component.html',
  styleUrls: ['./member-list.component.scss']
})
export class MemberListComponent implements OnInit {
  @Input()
  totalMember: number;

  @Input()
  memberAvartarList: Array<MemberShortInfo>;

  constructor() {}

  ngOnInit(): void {}
}
