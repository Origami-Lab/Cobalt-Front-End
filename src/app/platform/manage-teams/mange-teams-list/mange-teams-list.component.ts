import {Component, OnInit} from '@angular/core';
import {Team} from '../../teams/model/team.interface';
import {TeamsService} from '../../teams/teams.service';

@Component({
  selector: 'co-mange-teams-list',
  templateUrl: './mange-teams-list.component.html',
  styleUrls: ['./mange-teams-list.component.scss']
})
export class MangeTeamsListComponent implements OnInit {
  pageNumber: number = 1;
  teamList: Team[];
  loading: boolean = true;
  title: 'Manage Teams';

  constructor(private teamsService: TeamsService) {}

  ngOnInit(): void {
    this.getTeamsList(this.pageNumber);
  }

  getTeamsList(pageNumber: number): void {
    this.teamsService
      .getTeamsList(pageNumber)
      .pipe()
      .subscribe((result: Team[]) => {
        this.loading = false;
        this.teamList = result;
      });
  }
}
