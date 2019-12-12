import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { HeaderComponent } from './header/header.component';
import { MoviesListComponent } from './movies-list.component';
import { SharedModule } from '../Shared/shared.module';
import { ResolverService } from '../resolver.service';
import { SharedMaterialModule } from '../Shared/shared-material.module';

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
  // {
  //   path: "myprofile",
  //   loadChildren: () =>
  //     import("../user-profile-page/user-profile-page.module").then(
  //       m => m.UserProfilePageModule
  //     )
  // }
];

@NgModule({
  declarations: [
    MoviesListComponent,
    HeaderComponent,
  ],
  imports: [
    SharedModule,
    RouterModule.forChild(ROUTES),
    FormsModule,
    ReactiveFormsModule,
    SharedMaterialModule,
  ],
  exports: [
    SharedMaterialModule,
  ],
  entryComponents: [], 
  providers: [] 
})
export class MoviesListModule { 

   

}
