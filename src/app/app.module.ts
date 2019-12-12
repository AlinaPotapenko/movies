import { BrowserModule } from '@angular/platform-browser';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './auth.guard';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { UserProfilePageComponent } from './user-profile-page/user-profile-page.component';

const APP_ROUTING: Routes = [
  {
    path: "",
    redirectTo: "login",
    pathMatch: "full"
  },
  {
    path: "login",
    loadChildren: () => import("./login/login.module").then(m => m.LoginModule)
  },
  {
    path: "profile/:name",
    canActivate: [AuthGuard],
    loadChildren: () =>
      import("./user-profile-page/user-profile-page.module").then(
        m => m.UserProfilePageModule
      )
  },
  {
    path: "movies",
    canActivate: [AuthGuard],
    loadChildren: () =>
      import("./movies-list/movies-list.module").then(m => m.MoviesListModule)
  },
  {
    path: "**",
    loadChildren: () =>
      import("./page-not-found/page-not-found.module").then(
        m => m.PageNotFoundModule
      )
  }
];


const rootRouting: ModuleWithProviders = RouterModule.forRoot(APP_ROUTING);


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    rootRouting,
    BrowserAnimationsModule,

  ],
  providers: [AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
