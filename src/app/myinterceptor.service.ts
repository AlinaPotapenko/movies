import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/Operators';

@Injectable({
  providedIn: 'root'
})
export class Myinterceptor implements HttpInterceptor {

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
  		return next.handle(req).catchError( error => {
  			if (error.code == "503") {
  				console.log("redirect!");
  			}
  			return throwError(error);
  		});
  }
}
