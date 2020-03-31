import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { HttpService } from './services/http.service';
import { Myinterceptor } from '../interceptors/Myinterceptor.service';
import { LimitationPipe } from './pipes/limitation.component';
import { BoldDirective } from '../Directives/bold.directive';
import { DataService } from './services/data.service';



@NgModule({
  imports: [
    CommonModule,
    // Forms
    FormsModule,
    ReactiveFormsModule,
    // Http
    HttpClientModule,
    // Router
    RouterModule
  ],
  declarations: [ LimitationPipe, BoldDirective ],
  providers: [
    HttpService,
    {   provide: HTTP_INTERCEPTORS,
        useClass: Myinterceptor,
        multi: true
    },
    DataService
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    HttpClientModule,
    LimitationPipe,
    BoldDirective
  ]
})
export class SharedModule { }

