import {TokenPayload} from 'ngx-api-utils';

/**
 * The payload of a token in the app
 * @example
 * {
 *  "exp": 1597365088,
 *  "user_name": "username",
 *  "authorities": [],
 *  "jti": "pRrknE31FlyUlv7FpT1QpnNtDB0",
 *  "client_id": "gisp",
 *  "scope": [
 *    "read",
 *    "write",
 *    "identity"
 *  ]
 * }
 * @see https://www.iana.org/assignments/jwt/jwt.xhtml
 */
export class JwtTokenPayload extends TokenPayload {
  sub: string;
  name: string;
  email: string;
  uid: string;
  iat: number;

  constructor(rawPayload: Partial<JwtTokenPayload>) {
    super();
    Object.assign(this, rawPayload);
  }

  effectiveUserId(): string {
    if (this.uid) {
      return this.uid;
    }

    return this.sub;
  }
}
