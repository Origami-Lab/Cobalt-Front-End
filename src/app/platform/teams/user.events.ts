import {User} from './model/team.interface';

export class ChanageUser {
  constructor(public user: User) {}
}

export type UserEvents = ChanageUser;
