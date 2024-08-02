import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { catchError, Observable, take, tap, throwError } from 'rxjs';
import { environment } from '../../environments/environment.development';

export class httpInterceptorClass implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let newRequest = req
    const usertoken = localStorage.getItem(environment.userSecret)
    newRequest = req.clone({
      headers: newRequest.headers.set('Authorization', 'Bearer ' + usertoken),
      url: environment.apiurl + req.url
    })
    return next.handle(newRequest).pipe(tap(
      (event: HttpEvent<any>) => {
        if (event instanceof HttpResponse) {

        }
      }), catchError((error: HttpErrorResponse) => {

        return throwError(() => error)
      })
    )
  }
};
