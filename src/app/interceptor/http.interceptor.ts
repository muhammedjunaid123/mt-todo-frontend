import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { catchError, Observable,  tap, throwError } from 'rxjs';
import { environment } from '../../environments/environment.development';
import { NgxSpinnerService } from 'ngx-spinner';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class httpInterceptorClass implements HttpInterceptor {

  constructor(private spinner: NgxSpinnerService) { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.spinner.show();
    let newRequest = req
    const usertoken = localStorage.getItem(environment.userSecret)

    newRequest = req.clone({
      headers: newRequest.headers.set('Authorization', 'Bearer ' + usertoken),
      url: environment.apiurl + req.url
    })

    return next.handle(newRequest).pipe(tap(

      (event: HttpEvent<any>) => {

        if (event instanceof HttpResponse) {
          this.spinner.hide();
        }
      }), catchError((error: HttpErrorResponse) => {
        this.spinner.hide();
        return throwError(() => error)
      })

    )

  }
};
