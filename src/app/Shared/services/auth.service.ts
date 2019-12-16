import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Router} from '@angular/router';
import { environment } from 'src/environments/environment';

import { LoginComponent } from '../../login/login.component';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
 
  constructor(private _router: Router) { }

  isAuth() {
	  let userInfo = JSON.parse(localStorage.getItem('info'));
  	if(userInfo) {
  		return true;
  	} else {
  		this._router.navigate(['login']).then();
  	    return false;
  }
 }


}
