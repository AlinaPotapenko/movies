import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup} from '@angular/forms';
import { Router} from '@angular/router';

import { AuthService } from '../Shared/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginControl: FormGroup;
  wrongCredentials: Boolean = false;
  public canActivate: Boolean = false;


  constructor(private _router: Router, private _authService: AuthService) {
  	this.loginControl = new FormGroup({
      email: new FormControl(),
      pswd: new FormControl()
    });

  }

  ngOnInit() {
  }

  submitForm() {
  	(this.validateForm());

  	let value = this.loginControl.value;
  	if (value.email == "alina@gmail.com" && value.pswd == "123") {
  		(this.navigateToMovies());
    	localStorage.setItem("Name:", "Alina");
    	localStorage.setItem("Company:", "Synergetica");
    	localStorage.setItem("Access:", "true");
    } else if (typeof(value.email) == "string" && typeof(value.pswd) == "string") {
    	this.wrongCredentials = true;
    }
  }

  validateForm() {
  	let value = this.loginControl.value;
  	console.log(value);
  	if (value.email == null) {
  		document.getElementById("float-input").style.boxShadow = "inset 0 0 0.3em red";
        setTimeout(function() {
        document.getElementById("float-input").style.boxShadow = ""; 
      }, 3000);
    } else {
      document.getElementById("float-input").style.boxShadow = "";
    }

    if (value.pswd == null) {
  		document.getElementById("float-pswd").style.boxShadow = "inset 0 0 0.3em red";
        setTimeout(function() {
        document.getElementById("float-pswd").style.boxShadow = ""; 
      }, 3000);
    } else {
      document.getElementById("float-pswd").style.boxShadow = "";
    }
  }

  navigateToMovies() {
  	this._router.navigate([`movies`]).then();
  }

}
