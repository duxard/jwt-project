import { Inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { API_SPECIALS_LIST } from '../../../constants/api';
import { catchError, retry, timeout } from 'rxjs/operators';
import { SpecialEvents } from './SpecialEvents';
import { APP_CONFIG } from '../../../constants/appconfig';
import { Appconfig } from '../../../models/Appconfig';

@Injectable({
  providedIn: 'root'
})
export class SpecialEventsService {

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(
    @Inject(APP_CONFIG) private appConfig: Appconfig,
    private http: HttpClient
  ) { }

  fetchSpecialEvent(): Observable<SpecialEvents[]> {
    return this.http.get<SpecialEvents[]>(`${this.appConfig.localHost}${API_SPECIALS_LIST}`, this.httpOptions)
      .pipe(
        timeout(5000),
        retry(1),
        catchError(this.errorHandler)
      );
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
