import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';

import { LoginComponent } from '../../login/login.component';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  isAuth() {
  	let access = localStorage.getItem("Access:");
  	return Boolean(access);
  }
}
