import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MoviesListComponent } from './movies-list.component';
import { SharedModule } from '../Shared/shared.module';
import { SharedMaterialModule } from '../Shared/shared-material.module';
import { MoviesComponentsList } from './movies-list.components.component';

const ROUTES: Routes = [
  {
    path: "",
    component: MoviesListComponent
  },
  {
    path: "details/:imdbID",
    loadChildren: () =>
      import("./movie-details/movie-details.module").then(
        m => m.MovieDetailsModule
      )
  }
];

@NgModule({
  declarations: [
    MoviesComponentsList
  ],
  imports: [
    SharedModule,
    RouterModule.forChild(ROUTES),
    FormsModule,
    ReactiveFormsModule,
    SharedMaterialModule,
  ],
  exports: [],
  providers: [] 
})
export class MoviesListModule { 

   

}
