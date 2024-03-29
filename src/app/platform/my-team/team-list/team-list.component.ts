import {Component, OnDestroy, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {Subscription} from 'rxjs';
import {filter} from 'rxjs/operators';
import {AuthService} from 'src/app/auth/auth.service';
import {BreadcrumbConfig} from '../../platform-shared/components/breadcrumb/breadcrumb-config.interface';
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
  sortBy = 'desc';
  title = 'My Teams';
  private subscription: Subscription;

  constructor(private teamsService: TeamsService, private authService: AuthService) {}

  ngOnInit(): void {
    this.watchUpdate();
    this.watchCreateTeam();
    this.getTeamByUser();
    this.setCurrentUrl();
    this.watchInviteMember();
  }

  setCurrentUrl(): void {
    const teamUrlInfo: BreadcrumbConfig = {
      label: 'My Team',
      path: ['my-team', 'list']
    };
    localStorage.setItem('team_url', JSON.stringify(teamUrlInfo));
  }

  getTeamByUser(): void {
    const userId = localStorage.getItem('user_id');
    this.authService.getUserById(userId).subscribe(rs => {
      this.teamList = rs.teams.reverse();
    });
  }

  watchUpdate(): void {
    this.subscription = this.teamsService.events$.pipe(filter(e => e instanceof EditTeam)).subscribe(({team}) => {
      this.applyTeamChanges(team);
    });
  }

  watchInviteMember(): void {
    this.subscription = this.teamsService.memberEvent$.pipe().subscribe(rs => {
      this.getTeamByUser();
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

  removeDeletedTeam(teamId: number | string): void {
    this.teamList = this.teamList.filter(team => team.id !== teamId);
  }
}
