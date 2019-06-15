import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {BaseRestService} from './base-rest.service';
import {HttpClient} from '@angular/common/http';
import {Room} from '../models/room';
import {Message} from '../models/message';

@Injectable({
  providedIn: 'root'
})
export class RoomService extends BaseRestService {
  private URL = '/room';

  constructor(protected http: HttpClient) {
    super(http);
  }

  get(params): Observable<Room> {
    return this.getByType<Room>(`${this.URL}`, params);
  }

  create(params): Observable<Room> {
    return this.postbyType<Room>(`${this.URL}`, params);
  }

  createMessage(params, roomId: number): Observable<Message> {
    return this.postbyType<Message>(`${this.URL}/${roomId}/messages`, params);
  }
}
