import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from 'src/app/shared/services/auth.service';


@Component({
  selector: 'app-registration-form',
  templateUrl: './registration-form.component.html',
  styleUrls: ['./registration-form.component.scss']
})
export class RegistrationFormComponent implements OnInit {
  registrationControl: FormGroup;

  constructor(private _router: Router, private _authService: AuthService) {
    this.registrationControl = new FormGroup({
      name: new FormControl('', [Validators.required]),
      surname: new FormControl('', [Validators.required]), 
      email: new FormControl('', [Validators.required, Validators.email]),
      pswd: new FormControl('', [Validators.required])
    });
   }

  ngOnInit() {
  }

  submitForm(form) {
    let id = Math.round(Math.random()*100000000);
    let newUser = this.registrationControl.value;
    localStorage.setItem(`${id}`, JSON.stringify(newUser));
    this._authService.passInfo(id, newUser);
    this._router.navigate(['movies']).then();
    // console.log(this.userId)
  }

}
