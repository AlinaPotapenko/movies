import { BrowserModule } from '@angular/platform-browser';
import { ModuleWithProviders, NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { RouterModule, Routes } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

const APP_ROUTING: Routes = [
  {
    path: '',
    redirectTo: 'movies',
    pathMatch: 'full',
  },
  {
    path: 'movies',
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
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
