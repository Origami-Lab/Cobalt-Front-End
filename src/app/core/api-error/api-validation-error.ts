export class ApiValidationError {
  /**
   * Field/Property name
   */
  name: string;

  /**
   * Field/Property value
   */
  value: any;

  /**
   * The type of validation violation that have been triggered
   */
  validation: any | string;

  /**
   * Humanized reason, should not be utilized
   */
  reason: string;
}
