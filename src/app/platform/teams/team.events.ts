import {Team} from './model/team.interface';

export class EditTeam {
  constructor(public team: Team) {}
}

export type TeamEvents = EditTeam;
