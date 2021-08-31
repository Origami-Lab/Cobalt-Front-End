import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {ApiHttpService} from 'ngx-api-utils';
import {IMyTeam} from './models/my-team.interface';

@Injectable({
  providedIn: 'root'
})
export class MyTeamService {
  constructor(private apiHttp: ApiHttpService) {}

  getTeamsList(): any {
    return this.apiHttp.get<IMyTeam[]>('/teams?page=1');
  }

  getTeamsById(id: string): any {
    return this.apiHttp.get<IMyTeam>(`/teams/${id}`);
  }

  deleteTeamById(id: string): any {
    return this.apiHttp.delete<IMyTeam>(`/teams/${encodeURIComponent(id)}`);
  }

  createMyTeam(myTeamForm): Observable<IMyTeam> {
    return this.apiHttp.post<IMyTeam>('/teams', myTeamForm);
  }
}
