import {Injectable} from '@angular/core';
import {BaseRestService} from './base-rest.service';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import {User} from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService extends BaseRestService {
  private URL = '/users';

  // @ts-ignore
  userSubject = new BehaviorSubject<User>(false);
  user = this.userSubject.asObservable();

  constructor(protected http: HttpClient) {
    super(http);
  }

  create(data): Observable<User> {
    return this.postbyType<User>(`${this.URL}`, data);
  }

  getAll(): Observable<User[]> {
    return this.getByType<User[]>(`${this.URL}`);
  }

  get(id: number): Observable<User> {
    return this.getByType<User>(`${this.URL}/${id}`);
  }

  getIp(): Observable<{ip: string}> {
    return this.http.get<{ip: string}>(`https://jsonip.com`);
  }
}
