import {Injectable} from '@angular/core';
import {TokenDecoder} from 'ngx-api-utils';
import jwt_decode from 'jwt-decode';
import {JwtTokenPayload} from './jwt-token-payload';

@Injectable({
  providedIn: 'root'
})
export class JwtTokenDecoderService extends TokenDecoder<JwtTokenPayload> {
  decode(token: string): JwtTokenPayload {
    // @ts-ignore
    return new JwtTokenPayload(jwt_decode(token));
  }
}
