import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class TokenInterceptorService implements HttpInterceptor {

  constructor() { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const clonedRequest = req.clone({
      setHeaders: {
        Authorization: 'Bearer xx.yy.zz'
      }
    });

    return next.handle(clonedRequest)
      .pipe(
        tap((interceptedRequest) => console.log('Request has been intercepted', interceptedRequest))
      );
  }
}
