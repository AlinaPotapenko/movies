import { MoviesListComponent } from './movies-list.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MovieDetailsComponent } from './movie-details/movie-details.component';
import { SharedModule } from '../Shared/shared.module';

const ROUTES: Routes = [
  {
    path: '',
    component: MoviesListComponent
  },
  {
    path: 'details',
    component: MovieDetailsComponent
  }
];


@NgModule({
  declarations: [
    MoviesListComponent,
    MovieDetailsComponent
  ],
  imports: [
    SharedModule,
    RouterModule.forChild(ROUTES),
    FormsModule,
    ReactiveFormsModule
  ],
  // providers: [HttpClient],
  exports: []
})
export class MoviesListModule { 

   

}
