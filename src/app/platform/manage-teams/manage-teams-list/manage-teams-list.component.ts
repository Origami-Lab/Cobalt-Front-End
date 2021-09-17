import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {filter} from 'rxjs/operators';
import {BreadcrumbConfig} from '../../platform-shared/components/breadcrumb/breadcrumb-config.interface';
import {Team} from '../../teams/model/team.interface';
import {EditTeam} from '../../teams/team.events';
import {TeamsService} from '../../teams/teams.service';

@Component({
  selector: 'co-manage-teams-list',
  templateUrl: './manage-teams-list.component.html',
  styleUrls: ['./manage-teams-list.component.scss']
})
export class ManageTeamsListComponent implements OnInit, OnDestroy {
  pageNumber = 1;
  teamList: Team[];
  loading = true;
  title = 'Manage Teams';
  subscription: Subscription;

  constructor(private teamsService: TeamsService) {}

  ngOnInit(): void {
    this.getTeamsList(this.pageNumber);
    this.watchUpdate();
    this.watchCreateTeam();
    this.setCurrentUrl();
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

  removeDeletedTeam(teamId: number | string): void {
    this.teamList = this.teamList.filter(team => team.id !== teamId);
  }

  setCurrentUrl(): void {
    const teamUrlInfo: BreadcrumbConfig = {
      label: 'Manage Teams',
      path: ['manage-team', 'list']
    };
    localStorage.setItem('team_url', JSON.stringify(teamUrlInfo));
  }
}
