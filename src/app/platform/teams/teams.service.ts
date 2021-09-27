import {Injectable} from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {ApiHttpService} from 'ngx-api-utils';
import {Team, User, User2Team} from './model/team.interface';
import {EditTeam, TeamEvents} from './team.events';
import {tap} from 'rxjs/operators';

export interface UserWithTeam extends User {
  teamId?: string;
}

@Injectable({
  providedIn: 'root'
})
export class TeamsService {
  readonly events$ = new Subject<TeamEvents>();
  readonly createEvent$ = new Subject<TeamEvents>();
  readonly memberEvent$ = new Subject<UserWithTeam>();
  constructor(private apiHttp: ApiHttpService) {}

  getTeamsList(page: number, sortBy: string = 'desc'): Observable<Team[]> {
    return this.apiHttp.get<Team[]>(`/teams?page=${page}&order[id]=${sortBy}`);
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

  getUser2TeamById(teamId: string, page: number): Observable<User2Team[]> {
    return this.apiHttp.get<User2Team[]>(`/teams/${teamId}/users2teams?page=${page}`);
  }

  getAllMembersOfAllTeams(): Observable<User2Team[]> {
    return this.apiHttp.get<User2Team[]>(`/users2teams`);
  }

  getUser(
    keySearch: string = '',
    roleName: string = '',
    page: number = 1,
    itemsPerPage: number = 30,
    order: string = 'desc'
  ): Observable<User[]> {
    return this.apiHttp.get<User[]>(`/users?query=${keySearch}&role=${roleName}&order=${order}&itemsPerPage=${itemsPerPage}&page=${page}`);
  }

  updateTeam(id: string, teamForm): any {
    return this.apiHttp.put<Team>(`/teams/${encodeURIComponent(id)}`, teamForm).pipe(
      tap(rs => {
        this.triggerEvent(new EditTeam(rs), this.events$);
      })
    );
  }

  addMember2Team(formData: User2Team, user: UserWithTeam): any {
    return this.apiHttp.post<User2Team>('/users2teams', formData).pipe(
      tap(() => {
        this.memberEvent$.next(user);
      })
    );
  }

  removeMember2Team(id: string): Observable<User2Team> {
    return this.apiHttp.delete<User2Team>(`/users2teams/${encodeURIComponent(id)}`);
  }

  private triggerEvent(e: TeamEvents, events$: Subject<TeamEvents>): void {
    (events$ as Subject<TeamEvents>).next(e);
  }
}
