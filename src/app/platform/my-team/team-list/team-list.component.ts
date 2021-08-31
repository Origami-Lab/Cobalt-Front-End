import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {MyTeamService} from '../my-team.service';

@Component({
  selector: 'co-team-list',
  templateUrl: './team-list.component.html',
  styleUrls: ['./team-list.component.scss']
})
export class TeamListComponent implements OnInit {
  myTeamList = [];

  constructor(private myTeamService: MyTeamService, private readonly router: Router) {}

  ngOnInit(): void {
    this.getTeamsList();
  }

  getTeamsList(): void {
    this.myTeamService.getTeamsList().subscribe(rs => {
      this.myTeamList = rs;
    });
  }

  goDetail(teamID): void {
    this.router.navigate(['platform/view/my-team/detail/', teamID]);
  }
}
