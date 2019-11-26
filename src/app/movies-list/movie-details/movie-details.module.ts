import { MovieDetailsComponent } from './movie-details.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const ROUTES: Routes = [
  {
    path: '',
    component: MovieDetailsComponent
  }
];


@NgModule({
  declarations: [
    MovieDetailsComponent
  ],
  imports: [
    RouterModule.forChild(ROUTES)
  ]
})
export class MovieDetailsModule { }
