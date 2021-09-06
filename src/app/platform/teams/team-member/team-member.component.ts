import {Component, OnInit} from '@angular/core';
import {ApiError} from 'src/app/core/api-error/api-error';
import {TeamDelete} from '../model/team.interface';
import {TeamsService} from '../teams.service';

@Component({
  selector: 'co-team-member',
  templateUrl: './team-member.component.html',
  styleUrls: ['./team-member.component.scss']
})
export class TeamMemberComponent implements OnInit {
  apiError: ApiError;
  memberList = [];
  constructor(private teamsServer: TeamsService) {}

  ngOnInit(): void {
    this.getAllMemberOfAllTeams();
  }

  getAllMemberOfAllTeams(): void {
    this.teamsServer
      .getAllMembersOfAllTeams()
      .pipe()
      .subscribe(rs => {
        this.memberList = rs;
      });
  }

  resetError(): void {
    this.apiError = null;
  }

  onDeleteTeam(deleteEL: TeamDelete): void {
    // TO DO
  }

  removeDeletedTeam(memberId: number | string): void {
    this.memberList = this.memberList.filter(member => member.id !== memberId);
  }
}
