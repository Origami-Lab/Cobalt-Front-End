import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {Team} from '../../teams/model/team.interface';
import {TeamsService} from '../../teams/teams.service';

@Component({
  selector: 'co-my-team-list',
  templateUrl: './team-list.component.html',
  styleUrls: ['./team-list.component.scss']
})
export class TeamListComponent implements OnInit {
  teamList: Team[];
  page: number = 1;

  constructor(private teamsService: TeamsService, private readonly router: Router) {}

  ngOnInit(): void {
    this.getTeamsList(this.page);
  }

  getTeamsList(page: number): void {
    this.teamsService.getTeamsList(page).subscribe((rs: Team[]) => {
      this.teamList = rs;
    });
  }
}
