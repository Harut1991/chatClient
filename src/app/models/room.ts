import {Message} from './message';

export interface Room {
  id: number;
  messages: Message[];
}
