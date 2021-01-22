import {HttpErrorResponse} from '@angular/common/http';
import {ApiError} from './api-error';

export class ApiHttpErrorResponse extends HttpErrorResponse {
  static contentType = 'application/vnd.error+json';

  readonly error: ApiError;
  readonly name = 'ApiHttpErrorResponse' as any;

  constructor(init: Partial<HttpErrorResponse>) {
    super(init);
    this.error = new ApiError(this.error);
  }

  static httpErrorResponseToApiErrorResponseMaybe(httpErrorResponse: HttpErrorResponse): HttpErrorResponse | ApiHttpErrorResponse {
    if (httpErrorResponse.headers.get('content-type') === ApiHttpErrorResponse.contentType) {
      httpErrorResponse = new ApiHttpErrorResponse(httpErrorResponse);
    }
    return httpErrorResponse;
  }
}
