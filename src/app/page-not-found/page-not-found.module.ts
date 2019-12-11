import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { PageNotFoundComponent } from './page-not-found.component';
import { SharedMaterialModule } from '../Shared/shared-material.module';
import { SharedModule } from '../Shared/shared.module';

const ROUTES: Routes = [
  {
    path: '',
    component: PageNotFoundComponent,
  }
];

@NgModule({
  declarations: [PageNotFoundComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(ROUTES),
    SharedMaterialModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    SharedMaterialModule
  ]
})
export class PageNotFoundModule { }
