import {Room} from './room';

export interface Message {
  id: number;
  message: string;
  fileName?: string;
  userId: number;
  created: Date;
  room?: Room;
}
