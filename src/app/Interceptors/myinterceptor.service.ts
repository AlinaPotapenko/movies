import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/Operators';
import {MessageService} from 'primeng/api';


@Injectable({
  providedIn: 'root'
})
export class Myinterceptor implements HttpInterceptor {

  constructor(private messageService: MessageService) {};

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
  		return next.handle(req).pipe(catchError( error => {
  		if (error.status == "404" || error.status == "503") {
        this.messageService.add({severity:'error', summary: error.status + "  " + error.statusText, detail: error.error.http_response.message});
  		}
  		return throwError(error);
  		}));
  }
}
