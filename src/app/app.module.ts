import { BrowserModule } from '@angular/platform-browser';
import { ModuleWithProviders, NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { RouterModule, Routes } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './auth.guard';

const APP_ROUTING: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then(m => m.LoginModule)
  },
  {
    path: 'movies',
    canActivate: [AuthGuard],
    loadChildren: () => import('./movies-list/movies-list.module').then(m => m.MoviesListModule)
  }
];

const rootRouting: ModuleWithProviders = RouterModule.forRoot(APP_ROUTING);

@NgModule({
  declarations: [
    AppComponent,
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
