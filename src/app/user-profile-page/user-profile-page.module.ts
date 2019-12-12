import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from "@angular/router";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { SharedMaterialModule } from "../Shared/shared-material.module";
import { SharedModule } from "../Shared/shared.module";
import { UserProfilePageComponent } from './user-profile-page.component';

const ROUTES: Routes = [
  {
    path: "",
    component: UserProfilePageComponent
  }
];

@NgModule({
  declarations: [UserProfilePageComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(ROUTES),
    FormsModule,
    ReactiveFormsModule,
    SharedMaterialModule,
    SharedModule
  ],
  exports: [
    SharedMaterialModule
  ]
})
export class UserProfilePageModule {}
