import { Inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import {API_LOGIN, API_REGISTER_NEW_USER} from '../constants/api';
import { APP_CONFIG } from '../constants/appconfig';
import { Appconfig } from '../models/Appconfig';
import { catchError, timeout } from 'rxjs/operators';
import { RegistrationData } from './RegistarationData';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(
    @Inject(APP_CONFIG) private appConfig: Appconfig,
    private httpClient: HttpClient
  ) { }

  register(data: RegistrationData): Observable<RegistrationData> {
    return this.httpClient.post<RegistrationData>(`${this.appConfig.localHost}${API_REGISTER_NEW_USER}`, JSON.stringify(data), this.httpOptions)
      .pipe(
        timeout(3000),
        catchError(this.errorHandler)
      );
  }

  login(data: RegistrationData): Observable<RegistrationData> {
    return this.httpClient.post<RegistrationData>(`${this.appConfig.localHost}${API_LOGIN}`, JSON.stringify(data), this.httpOptions)
      .pipe(
        timeout(3000),
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
      errorMessage = error;
    }
    return throwError(errorMessage);
  }
}
