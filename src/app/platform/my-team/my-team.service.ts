import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {ApiHttpService} from 'ngx-api-utils';
import {MyTeam} from './models/my-team.interface';

@Injectable({
  providedIn: 'root'
})
export class MyTeamService {
  constructor(private apiHttp: ApiHttpService) {}

  getTeamsList(): any {
    return this.apiHttp.get<MyTeam[]>('/teams?page=1');
  }

  getTeamsById(id: string): any {
    return this.apiHttp.get<MyTeam>(`/teams/${id}`);
  }

  deleteTeamById(id: string): any {
    return this.apiHttp.delete<MyTeam>(`/teams/${encodeURIComponent(id)}`);
  }

  createMyTeam(myTeamForm): Observable<MyTeam> {
    return this.apiHttp.post<MyTeam>('/teams', myTeamForm);
  }
}
