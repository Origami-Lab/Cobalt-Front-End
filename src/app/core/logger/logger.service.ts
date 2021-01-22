import {ErrorHandler, Injectable} from '@angular/core';
import {NGXLogger} from 'ngx-logger';

@Injectable()
export class LoggingErrorHandlerService implements ErrorHandler {
  handleError(error: any): void {
    const logger = ((window as any).logger as NGXLogger) || console;
    try {
      logger.error(error);
    } catch (e) {
      console.error(e);
    }
  }
}
