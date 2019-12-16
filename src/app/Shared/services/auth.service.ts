import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Router, NavigationExtras } from '@angular/router';
import { environment } from 'src/environments/environment';

import { LoginComponent } from '../../login/login.component';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  userInfo = {};
  currentPswd: string;
  currentEmail: string;
  currentId: string;

  constructor(private _router: Router) { }

  passRegistrationInfo(id, user) {
    this.userInfo = user;
    this.currentEmail = user.email;
    this.currentPswd = user.pswd;
    this.currentId = id;
     (this.navigateToMovies());
  }

  passLoginInfo(email, pswd) {
    this.currentEmail = email;
    this.currentPswd = pswd;
     (this.navigateToMovies());

  }

  isAuth() {
	  // let users = Object.keys(localStorage).map(k => localStorage.getItem(k));
    for (let key of Object.keys(localStorage)) {
      let user = JSON.parse(localStorage.getItem(`${key}`));
        if (this.currentEmail == user.email && 
            this.currentPswd == user.pswd) {
              this.userInfo = user;
              // this.userInfo.access = true;
              // return this.userInfo.access;
        } 
    } 
  };

 navigateToMovies() {
    // let navigationExtras: NavigationExtras = {
    //  queryParams: {
    //       id: JSON.stringify(this.currentId),
    //       userInfo: JSON.stringify(this.userInfo)
    //  }
    // }
    this._router.navigate(['movies']).then();
 }

 getUserInfo() {
  return this.userInfo;
 }
 
}
