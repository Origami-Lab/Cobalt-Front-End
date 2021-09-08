import {Injectable} from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {ApiHttpService} from 'ngx-api-utils';
import {Team, User, User2Team} from './model/team.interface';
import {EditTeam, TeamEvents} from './team.events';
import {tap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TeamsService {
  readonly events$ = new Subject<TeamEvents>();
  readonly createEvent$ = new Subject<TeamEvents>();
  constructor(private apiHttp: ApiHttpService) {}

  getTeamsList(page: number): Observable<Team[]> {
    return this.apiHttp.get<Team[]>(`/teams?page=${page}`);
  }

  getTeamsById(id: string): Observable<Team> {
    return this.apiHttp.get<Team>(`/teams/${id}`);
  }

  deleteTeamById(id: string | number): Observable<Team> {
    return this.apiHttp.delete<Team>(`/teams/${encodeURIComponent(id)}`);
  }

  createMyTeam(myTeamForm): Observable<Team> {
    return this.apiHttp.post<Team>('/teams', myTeamForm).pipe(
      tap((rs: Team) => {
        this.triggerEvent(new EditTeam(rs), this.createEvent$);
      })
    );
  }

  getMemberTeamById(teamId: number): Observable<User2Team[]> {
    return this.apiHttp.get<User2Team[]>(`/users2teams/${teamId}`);
  }

  getAllMembersOfAllTeams(): Observable<User2Team[]> {
    return this.apiHttp.get<User2Team[]>(`/users2teams`);
  }

  getAllUser(): Observable<User[]> {
    return this.apiHttp.get<User[]>('/users');
  }

  updateTeam(id: string, teamForm): any {
    return this.apiHttp.put<Team>(`/teams/${encodeURIComponent(id)}`, teamForm).pipe(
      tap(rs => {
        this.triggerEvent(new EditTeam(rs), this.events$);
      })
    );
  }

  private triggerEvent(e: TeamEvents, events$: Subject<TeamEvents>): void {
    (events$ as Subject<TeamEvents>).next(e);
  }
}
