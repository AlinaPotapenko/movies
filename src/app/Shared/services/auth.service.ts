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
  allUsers = {};
  constructor(private _router: Router) { }

  passInfo(id, userInfo) {
	return this.allUsers[id] = userInfo;
  }

  isAuth() {
	//   let userInfo = JSON.parse(localStorage.getItem(`${id}`));
	  let users = Object.keys(localStorage).map(k => localStorage.getItem(k));
	  console.log(this.allUsers);
//   	if(userInfo) {
//   		return true;
//   	} else {
//   		this._router.navigate(['login']).then();
//   	    return false;
//   }
 }

}
