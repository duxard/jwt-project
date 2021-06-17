import { Inject, Injectable } from '@angular/core';
import { Item } from './Item';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry, timeout } from 'rxjs/operators';
import { APP_CONFIG } from '../../../constants/appconfig';
import { API_TODO_LIST } from '../../../constants/api';
import { Appconfig } from '../../../models/Appconfig';

@Injectable({
  providedIn: 'root'
})
export class TodosService {

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(
    @Inject(APP_CONFIG) private appConfig: Appconfig,
    private http: HttpClient
  ) { }

  fetchTodos(): Observable<Item[]> {
    return this.http.get<Item[]>(`${this.appConfig.serverHost}${API_TODO_LIST}`, this.httpOptions)
      .pipe(
        timeout(5000),
        retry(1),
        catchError(this.errorHandler)
      );
  }

  // @todo: remove
  async foo(): Promise<number> {
    const promise = new Promise((res, rej) => {
      setTimeout(() => res('done'), 1000);
    });
    const result = await promise;
    console.log(result);
    return 5000;
  }

  errorHandler(error: any): Observable<never> {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(errorMessage);
  }
}
