import {ConfirmModalComponent} from '../../platform-shared/components/confirm-modal/confirm-modal.component';

export interface Team {
  id?: string;
  name: string;
  deletableXp: boolean;
  linkName: string;
  linkHref: string;
  datetime: string;
  stamplogin: string;
  stamppass: string;
  stampprovider: string;
  stampcert: string;
  stamphash: string;
  orgid: string;
  publicDb: boolean;
  forceCanread?: string;
  forceCanwrite?: string;
  doForceCanread?: boolean;
  doForceCanwrite?: boolean;
  visible?: boolean;
  users?: Array<any>;
  users2teams?: Array<any>;
  totalUsers?: number;
}

export interface TeamDelete {
  modal: ConfirmModalComponent;
  id: string | number;
  name?: string;
  userId?: string | number;
}

export interface User {
  name: string;
  password: string;
  avatar: string;
  userid?: string;
  email?: string;
  mfaSecret?: string;
  token?: string;
  limitNb?: boolean;
  scCreate?: string;
  scEdit?: string;
  scSubmit?: string;
  scTodo?: string;
  incFilesPdf?: boolean;
  pdfa?: boolean;
  lastLogin?: string;
  isAdded?: boolean;
  totalExperiments?: number;
  teams?: Array<UserTeam>;
}

export interface UserTeam {
  id: number | string;
  name: string;
  users2teams_id: number;
}

export interface User2Team {
  teams: string;
  users: string;
}
