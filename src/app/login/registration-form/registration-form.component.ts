import { Component, OnInit, ViewChild, Renderer2, ElementRef } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router, NavigationExtras } from '@angular/router';

import { AuthService } from 'src/app/Shared/services/auth.service';


@Component({
  selector: 'app-registration-form',
  templateUrl: './registration-form.component.html',
  styleUrls: ['./registration-form.component.scss']
})
export class RegistrationFormComponent implements OnInit {

  // @ViewChild('inputRef', {static: false}) inputRef: ElementRef;
  registrationForm: FormGroup;

  constructor(private _renderer: Renderer2, private _router: Router, private _authService: AuthService) {
    this.registrationForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      surname: new FormControl('', [Validators.required]), 
      email: new FormControl('', [Validators.required, Validators.email]),
      pswd: new FormControl('', [Validators.required])
    });
   }

  ngOnInit() {
  }

  submitForm(form) {
    if (this.registrationForm.valid) {
    let id = Math.round(Math.random()*100000000);
    let newUser = this.registrationForm.value;
    newUser["access"] = true;
    localStorage.setItem(`${id}`, JSON.stringify(newUser));
    this._authService.passRegistrationInfo(id, newUser)
    } else {
      this.registrationForm.markAllAsTouched();
    }
  //else {
  //   this._renderer.setStyle(this.inputRef.nativeElement,'box-shadow', 'inset 0 0 0.3em red');
  //       setTimeout(() => {
  //       this._renderer.setStyle(this.inputRef.nativeElement,'box-shadow', ''); 
  //     }, 3000);
  // }
    // let navigationExtras: NavigationExtras = {
    //  queryParams: {
    //       id: JSON.stringify(id),
    //       userInfo: JSON.stringify(newUser)
    //  }
    // }
    // this._router.navigate(['movies'], navigationExtras).then();
  } 

}
