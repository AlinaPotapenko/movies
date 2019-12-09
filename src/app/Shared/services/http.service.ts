import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

const API_URL = environment.API_URL;
const Errors_URL = environment.Errors_URL;
const API_CONFIG = environment.API_CONFIG;

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  requestUrl: string;

  constructor(
    private http: HttpClient,
  ) { }

  /*public get<T>(endpoint: string, params?: any): Observable<any> {
    this.requestUrl = API_URL + API_CONFIG[endpoint];
    const getParams = { params: params };
    return this.http.get<T>(this.requestUrl, getParams);
  }

  public post<T>(endpoint: string, data: any, queryParams?: any): Observable<any> {
    this.requestUrl = typeof queryParams !== 'undefined' ? API_URL + API_CONFIG[endpoint] + queryParams : API_URL + API_CONFIG[endpoint];

    return this.http.post<T>(`${this.requestUrl}`, data);
  }*/

  public get<T>(params?: any): Observable<any> {
    const getParams = { params: params };
    return this.http.get<T>(API_URL, getParams);
  }

  public getError<T>(endpoint: string, params?: any): Observable<any> {
    this.requestUrl = Errors_URL + API_CONFIG[endpoint];
    const getParams = { params: params };
    return this.http.get<T>(this.requestUrl, getParams);
  }

  public post<T>(data: any, queryParams?: any): Observable<any> {
    this.requestUrl = typeof queryParams !== 'undefined' ? API_URL + queryParams : API_URL;

    return this.http.post<T>(`${this.requestUrl}`, data);
  }
}

