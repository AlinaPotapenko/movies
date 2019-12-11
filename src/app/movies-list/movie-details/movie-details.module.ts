import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes} from '@angular/router';

import { MovieDetailsComponent } from './movie-details.component';
import { ResolverService } from '../../resolver.service';
import { SharedMaterialModule } from '../../Shared/shared-material.module';


const ROUTES: Routes = [
  {
    path: '',
    component: MovieDetailsComponent,
    resolve: { message: ResolverService }
  }
 ];

 @NgModule({
  declarations: [
    MovieDetailsComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(ROUTES),
    SharedMaterialModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    ResolverService,
  ],
  exports: [
    SharedMaterialModule,
  ]
})
export class MovieDetailsModule { }
