import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MovieDetailsComponent } from './movie-details.component';
import { ResolverService } from 'C:/Users/Alina/Desktop/movies/src/app/resolver.service';
import { RouterModule, Routes} from '@angular/router';
import { SharedMaterialModule } from '../../Shared/shared-material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

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
