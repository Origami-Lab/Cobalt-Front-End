import {ApiValidationError} from './api-validation-error';
import {ApiErrorType} from './api-error-type.enum';

export class ApiError {
  /**
   * Programmatic and semantic error key, should be used to differentiate the types of errors {@see ApiErrorType}
   */
  error: ApiErrorType | string;

  /**
   * Humanized message, should not be utilized
   */
  message: string;

  /**
   * HTTP Status as string, should not be utilized
   */
  status: string;

  /**
   * Date in ISO string
   */
  timestamp: string;

  /**
   * List of ApiValidationError, applicable when `ApiError.error === ApiErrorType.VALIDATION_ERROR`
   */
  invalidParams?: ApiValidationError[];

  constructor(init?: Partial<ApiError>) {
    Object.assign(this, init || {});
  }
}
