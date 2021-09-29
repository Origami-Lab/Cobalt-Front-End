import {Injectable} from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {ApiHttpService} from 'ngx-api-utils';
import {Experiment} from './models/experiment.interface';
import {EditExperiment, ExperimentEvents} from './experiment.events';
import {tap} from 'rxjs/operators';
import {ExperimentTag, Labels} from './experiment-details/models/tag.interface';

@Injectable({
  providedIn: 'root'
})
export class ExperimentsService {
  readonly events$ = new Subject<ExperimentEvents>();

  constructor(private apiHttp: ApiHttpService) {}

  getExperiments(page: number, userId?: string | number): any {
    return this.apiHttp.get<Experiment[]>(`/experiments?page=${page}&userid=${userId}`);
  }

  getExperimentById(experimentId: number): Observable<Experiment> {
    return this.apiHttp.get<Experiment>(`/experiments/${encodeURIComponent(experimentId)}`);
  }

  deleteExperiment(experimentId: number): Observable<Experiment> {
    return this.apiHttp.delete<Experiment>(`/experiments/${encodeURIComponent(experimentId)}`);
  }

  createExperiment(experiment): Observable<Experiment> {
    return this.apiHttp.post<Experiment>('/experiments', experiment);
  }

  editExperiment(experiment): any {
    return this.apiHttp.put<Experiment>(`/experiments/${encodeURIComponent(experiment.id)}`, experiment).pipe(
      tap(experimentResponse => {
        this.triggerEvent(new EditExperiment(experimentResponse));
      })
    );
  }

  addTagToExperiment(form: ExperimentTag): Observable<ExperimentTag> {
    return this.apiHttp.post<ExperimentTag>('/experiments2labels', form);
  }

  removeTagFromExperiment(tagId: number): Observable<ExperimentTag> {
    return this.apiHttp.delete<ExperimentTag>(`/experiments2labels/${tagId}`);
  }

  getAllTag(label?: string): Observable<Labels[]> {
    return this.apiHttp.get<Labels[]>(`/labels?label=${label}`);
  }

  private triggerEvent(e: ExperimentEvents): void {
    (this.events$ as Subject<ExperimentEvents>).next(e);
  }
}
