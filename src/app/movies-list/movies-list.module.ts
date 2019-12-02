import { MoviesListComponent } from './movies-list.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MovieDetailsComponent } from './movie-details/movie-details.component';
import { SharedModule } from '../Shared/shared.module';
import { MatPaginatorModule} from '@angular/material/paginator';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';


const ROUTES: Routes = [
  {
    path: '',
    component: MoviesListComponent
  },
  {
    path: 'details/:imdbID',
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
    ReactiveFormsModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatSelectModule
  ],
  exports: [
  MatPaginatorModule,
  MatFormFieldModule,
  MatSelectModule
  ]
})
export class MoviesListModule { 

   

}
