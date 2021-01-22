import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'co-team-list',
  templateUrl: './team-list.component.html',
  styleUrls: ['./team-list.component.scss']
})
export class TeamListComponent implements OnInit {
  experiments = [];

  constructor() {}

  ngOnInit(): void {}
}
