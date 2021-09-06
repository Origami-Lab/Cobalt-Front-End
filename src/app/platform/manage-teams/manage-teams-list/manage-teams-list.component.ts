import {Component, OnInit} from '@angular/core';
import {Team} from '../../teams/model/team.interface';
import {TeamsService} from '../../teams/teams.service';

@Component({
  selector: 'co-manage-teams-list',
  templateUrl: './manage-teams-list.component.html',
  styleUrls: ['./manage-teams-list.component.scss']
})
export class ManageTeamsListComponent implements OnInit {
  pageNumber = 1;
  teamList: Team[];
  loading = true;
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
