export interface LoginCredentials {
  email: string;
  password: string;
}
export interface UserForm extends LoginCredentials {
  name?: string;
  avatar?: string;
  roles?: Array<string>;
}

export interface CountUser {
  total: number;
  byRoles: Array<Count>;
}
export interface Count {
  count: number;
  name: string;
}
