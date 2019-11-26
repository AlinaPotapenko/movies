import { MoviesListComponent } from './movies-list.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const ROUTES: Routes = [
  {
    path: '',
    component: MoviesListComponent
  },
  {
    path: 'details',
    loadChildren: () => import('./movie-details/movie-details.module').then(m => m.MovieDetailsModule)
  }
];


@NgModule({
  declarations: [
    MoviesListComponent
  ],
  imports: [
    RouterModule.forChild(ROUTES)
  ]
})
export class MoviesListModule { }
