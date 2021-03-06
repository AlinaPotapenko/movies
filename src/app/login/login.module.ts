import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SharedMaterialModule } from '../Shared/shared-material.module';
import { SharedModule } from '../Shared/shared.module';
import { LoginComponent } from './login.component';

const ROUTES: Routes = [
  {
    path: "",
    component: LoginComponent
  },
  {
    path: "registration",
    loadChildren: () =>
      import("./registration-form/registration-form.module").then(
        m => m.RegistrationFormModule
      )
  }
];

@NgModule({
  declarations: [
    LoginComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(ROUTES),
    FormsModule,
    ReactiveFormsModule,
    SharedMaterialModule,
  ], 
  exports: [
  	SharedMaterialModule
  ]
})

export class LoginModule { }
