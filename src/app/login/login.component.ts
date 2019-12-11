import { Component, OnInit, ViewChild, ElementRef, Renderer2 } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from '../shared/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {

 @ViewChild('emailRef', {static: false}) emailRef: ElementRef;
 @ViewChild('pswdRef', {static: false}) pswdRef: ElementRef;
 
 loginControl: FormGroup;
 wrongCredentials: Boolean = false;
 public canActivate: Boolean = false;


 constructor(private _router: Router, private _authService: AuthService, private _renderer: Renderer2) {
  	this.loginControl = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      pswd: new FormControl('', [Validators.required])
    });
 }

 ngOnInit() {}

 submitForm() {
  	// (this.validateForm());
  	let value = this.loginControl.value;
  	  if (value.email == 'alina@gmail.com' && value.pswd == '123') {
  		(this.navigateToMovies());
  		  let config = {
  			 name: 'Alina',
  			 company: 'Synergetica',
  			 access: true
  		  }
  		localStorage.setItem('info', JSON.stringify(config));
    } else if (typeof(value.email) == 'string' && typeof(value.pswd) == 'string') {
    	this.wrongCredentials = true;
    }
 }

 navigateToMovies() {
  	this._router.navigate(['movies']).then();
 }

  // validateForm() {
  // 	let value = this.loginControl.value;
  // 	console.log(value);
  // 	if (value.email == null) {
  // 		this._renderer.setStyle(this.emailRef.nativeElement,'box-shadow', 'inset 0 0 0.3em red');
  //       setTimeout(() => {
  //       this._renderer.setStyle(this.emailRef.nativeElement,'box-shadow', ''); 
  //     }, 3000);
  //   } else {
  //     this._renderer.setStyle(this.emailRef.nativeElement,'box-shadow', '');
  //   }

  //   if (value.pswd == null) {
  // 		this._renderer.setStyle(this.pswdRef.nativeElement,'box-shadow', 'inset 0 0 0.3em red');
  //       setTimeout(() => {
  //       this._renderer.setStyle(this.pswdRef.nativeElement,'box-shadow', ''); 
  //     }, 3000);
  //   } else {
  //     this._renderer.setStyle(this.pswdRef.nativeElement,'box-shadow', ''); 
  //   }
  // }

}
