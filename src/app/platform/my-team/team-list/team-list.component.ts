import {Component, OnDestroy, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {Subscription} from 'rxjs';
import {filter} from 'rxjs/operators';
import {Team} from '../../teams/model/team.interface';
import {EditTeam} from '../../teams/team.events';
import {TeamsService} from '../../teams/teams.service';

@Component({
  selector: 'co-my-team-list',
  templateUrl: './team-list.component.html',
  styleUrls: ['./team-list.component.scss']
})
export class TeamListComponent implements OnInit, OnDestroy {
  teamList: Team[];
  page = 1;
  title = 'My Teams';
  private subscription: Subscription;

  constructor(private teamsService: TeamsService, private readonly router: Router) {}

  ngOnInit(): void {
    this.getTeamsList(this.page);
    this.watchUpdate();
    this.watchCreateTeam();
  }

  getTeamsList(page: number): void {
    this.teamsService.getTeamsList(page).subscribe((rs: Team[]) => {
      this.teamList = rs;
    });
  }

  watchUpdate(): void {
    this.subscription = this.teamsService.events$.pipe(filter(e => e instanceof EditTeam)).subscribe(({team}) => {
      this.applyTeamChanges(team);
    });
  }

  watchCreateTeam(): void {
    this.subscription = this.teamsService.createEvent$.pipe(filter(e => e instanceof EditTeam)).subscribe(({team}) => {
      this.teamList.unshift(team);
    });
  }

  applyTeamChanges(teamEl: Team): void {
    this.teamList = this.teamList.map(team => {
      if (team.id === teamEl.id) {
        team = teamEl;
      }
      return team;
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
