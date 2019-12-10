import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SharedMaterialModule } from '../Shared/shared-material.module';
import { ResolverService } from '../resolver.service';
import { SharedModule } from '../Shared/shared.module';
import { LoginComponent } from './login.component';

const ROUTES: Routes = [
  {
    path: '',
    component: LoginComponent,
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
