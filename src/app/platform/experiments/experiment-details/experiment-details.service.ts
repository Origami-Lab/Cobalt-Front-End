import {Injectable} from '@angular/core';
import {ApiHttpService} from 'ngx-api-utils';
import {map} from 'rxjs/operators';
import {iif, Observable} from 'rxjs';
import {Protocol} from './models/protocol.interface';
import {Conclusion} from './models/conclusion.interface';
import {Note} from './models/note.interface';
import {transformToFormData} from '../../../core/utils/transform-to-form-data';
import {Link} from './models/link.interface';
import {Attachment} from './models/attachment.interface';

@Injectable({
  providedIn: 'root'
})
export class ExperimentDetailsService {
  constructor(private apiHttp: ApiHttpService) {}

  getProtocol(experimentId: number): Observable<Protocol> {
    return this.apiHttp
      .get<Protocol[]>('/experiments_protocols', {params: {experimentid: String(experimentId)}})
      .pipe(
        map(([protocol]) => {
          return protocol;
        })
      );
  }

  updateProtocol({id, ...rest}: Protocol): Observable<Protocol> {
    return iif(
      () => !!id,
      this.apiHttp.put<Protocol>(`/experiments_protocols/${encodeURIComponent(id)}`, rest),
      this.apiHttp.post<Protocol>('/experiments_protocols', rest)
    );
  }

  getConclusion(experimentId: number): Observable<Conclusion> {
    return this.apiHttp
      .get<Conclusion[]>('/experiments_conclusions', {params: {experimentid: String(experimentId)}})
      .pipe(map(([conclusion]) => conclusion));
  }

  updateConclusion({id, ...rest}: Conclusion): Observable<Conclusion> {
    return iif(
      () => !!id,
      this.apiHttp.put<Conclusion>(`/experiments_conclusions/${encodeURIComponent(id)}`, rest),
      this.apiHttp.post<Conclusion>('/experiments_conclusions', rest)
    );
  }

  getNotes(experimentId: number): Observable<Note[]> {
    return this.apiHttp.get<Note[]>('/experiments_notes', {params: {experimentid: String(experimentId)}});
  }

  createNote(note: Note): Observable<Note> {
    return this.apiHttp.post<Note>('/experiments_notes', note);
  }

  getFiles(experimentId: number): any {
    return this.apiHttp.get<any>(`/media_objects`, {params: {experimentid: String(experimentId)}});
  }

  attachFile(attachment: Attachment): any {
    const transformedAttachment = transformToFormData(attachment);
    return this.apiHttp.post<any>(`/media_objects`, transformedAttachment);
  }

  deleteFile(fileId: number): Observable<void> {
    return this.apiHttp.delete<void>(`/media_objects/${fileId}`);
  }

  getLinks(experimentId: number): Observable<Link[]> {
    return this.apiHttp.get<Link[]>('/experiments_links', {params: {experimentid: String(experimentId)}});
  }

  attachLink(link: Link): Observable<Link> {
    return this.apiHttp.post<Link>(`/experiments_links`, link);
  }

  deleteLink(linkId: number): Observable<void> {
    return this.apiHttp.delete<void>(`/experiments_links/${linkId}`);
  }

  uploadFile(file: File): any {
    const transformedAttachment = transformToFormData({file, filename: file.name});
    return this.apiHttp.post<any>(`/file_uploads`, transformedAttachment);
  }
}
