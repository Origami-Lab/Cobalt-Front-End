import {ErrorHandler, ModuleWithProviders, NgModule, Optional, SkipSelf} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LoggerModule, NGXLogger, NgxLoggerLevel} from 'ngx-logger';
import {environment} from '../../environments/environment';
import {LoggingErrorHandlerService} from './logger/logger.service';
import {
  API_AUTH_GUARD_PUBLIC_ONLY_ROUTES,
  API_AUTH_GUARD_URL_FOR_AUTHENTICATED,
  API_AUTH_GUARD_URL_FOR_AUTHENTICATION,
  API_HTTP_BASE_URL,
  API_HTTP_INTERCEPTORS,
  AUTH_TOKEN_NAME,
  NgxApiUtilsModule,
  TokenDecoder
} from 'ngx-api-utils';
import {JwtTokenDecoderService} from './auth/jwt-token-decoder.service';
import {JsonResponseInterceptor} from './api-http/json-response.interceptor';

export const authGuardPublicOnlyRoutes = /^\/(auth\/login)/;

@NgModule({
  declarations: [],
  imports: [CommonModule, NgxApiUtilsModule]
})
export class CoreModule {
  constructor(
    @Optional()
    @SkipSelf()
    parentModule: CoreModule,
    logger: NGXLogger
  ) {
    if (parentModule) {
      throw new Error('CoreModule is already loaded. Import it in the AppModule only');
    }
    (window as any).logger = logger;
  }

  static forRoot(): ModuleWithProviders<CoreModule> {
    return {
      ngModule: CoreModule,
      providers: [
        ...LoggerModule.forRoot({
          level:
            (sessionStorage.hasOwnProperty('logLevel') && parseInt(sessionStorage.getItem('logLevel'), 10)) ||
            (localStorage.hasOwnProperty('logLevel') && parseInt(localStorage.getItem('logLevel'), 10)) ||
            environment.production
              ? NgxLoggerLevel.WARN
              : NgxLoggerLevel.DEBUG
        }).providers,
        {
          provide: ErrorHandler,
          useClass: LoggingErrorHandlerService
        },
        {
          provide: AUTH_TOKEN_NAME,
          useValue: environment.authToken.name
        },
        {
          provide: API_HTTP_BASE_URL,
          useValue: environment.gatewayBaseUrl
        },
        {
          provide: API_AUTH_GUARD_PUBLIC_ONLY_ROUTES,
          useValue: authGuardPublicOnlyRoutes
        },
        {
          provide: API_AUTH_GUARD_URL_FOR_AUTHENTICATED,
          useValue: 'platform/view/experiments'
        },
        {
          provide: API_AUTH_GUARD_URL_FOR_AUTHENTICATION,
          useValue: 'auth/login'
        },
        {
          provide: API_HTTP_INTERCEPTORS,
          useClass: JsonResponseInterceptor,
          multi: true
        },
        // {
        //   provide: API_HTTP_INTERCEPTORS,
        //   useClass: HandleApiErrorsInterceptor,
        //   multi: true
        // },
        {
          provide: TokenDecoder,
          useClass: JwtTokenDecoderService
        }
      ]
    };
  }
}
