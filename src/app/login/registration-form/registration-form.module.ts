import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { RegistrationFormComponent } from './registration-form.component';
import { SharedMaterialModule } from '../../Shared/shared-material.module';
import { SharedModule } from '../../Shared/shared.module';

const ROUTES: Routes = [
  {
    path: "",
    component: RegistrationFormComponent
  }
]

@NgModule({
  declarations: [RegistrationFormComponent],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(ROUTES),
    FormsModule,
    ReactiveFormsModule,
    SharedMaterialModule
  ],
  exports: []
})
export class RegistrationFormModule { }
