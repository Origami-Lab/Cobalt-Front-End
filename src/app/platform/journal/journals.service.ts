import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {ApiHttpService} from 'ngx-api-utils';
import {Experiment} from '../experiments/models/experiment.interface';
import {SelectedDate} from './models/selected-date.interface';
import {mapRequestParams} from './map-request-params';

@Injectable({
  providedIn: 'root'
})
export class JournalsService {
  constructor(private apiHttp: ApiHttpService) {}

  getExperiments(page?: number, searchPhrase?: string, selectedDate?: SelectedDate): Observable<Experiment[]> {
    const params = mapRequestParams(page, searchPhrase, selectedDate);
    return this.apiHttp.get<Experiment[]>(`/experiments`, {
      params
    });
  }
}
