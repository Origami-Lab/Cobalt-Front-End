import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {ApiHttpService} from 'ngx-api-utils';
import {Team, User, User2Team} from './model/team.interface';

@Injectable({
  providedIn: 'root'
})
export class TeamsService {
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
    return this.apiHttp.post<Team>('/teams', myTeamForm);
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
}
