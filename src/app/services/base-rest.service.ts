import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from 'src/environments/environment';

export abstract class BaseRestService {
  protected constructor(protected http: HttpClient) {
  }

  protected postbyType<Type>(endpoint: string, item: any): Observable<Type> {
    return this.http.post<Type>(`${environment.apiurl}${endpoint}/`, item);
  }

  protected getByType<Type>(endpoint: string, params?: HttpParams): Observable<Type> {
    return this.http.get<Type>(`${environment.apiurl}${endpoint}/`, {params});
  }
}
