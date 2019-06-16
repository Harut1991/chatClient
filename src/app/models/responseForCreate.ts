import {User} from './user';

export interface ResponseForCreate {
  user: User;
  exist: boolean;
}
