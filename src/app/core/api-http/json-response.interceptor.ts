import {Injectable} from '@angular/core';
import {HttpRequest, HttpHandler, HttpEvent, HttpInterceptor} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable()
export class JsonResponseInterceptor implements HttpInterceptor {
  private static acceptHeaderName = 'Accept';
  private static acceptHeaderValue = 'application/json';
  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    let {headers} = request;
    headers = headers.set(JsonResponseInterceptor.acceptHeaderName, JsonResponseInterceptor.acceptHeaderValue);
    const reqClone = request.clone({headers});
    return next.handle(reqClone);
  }
}
