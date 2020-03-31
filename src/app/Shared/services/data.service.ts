import { Injectable } from '@angular/core';

import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private _http: HttpService) { }

  getMovies(params: object) {
    return this._http.get(params);
  }
}
