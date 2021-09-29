import {User2Team} from './model/team.interface';
export class ChanageUser {
  constructor(public user: User2Team) {}
}

export type UserEvents = ChanageUser;
