import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatCheckboxModule } from '@angular/material/checkbox';

import { RatingModule } from 'primeng/rating';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { MenuModule } from "primeng/menu";
import { HeaderComponent } from '../movies-list/header/header.component';
import { DropdownModule } from 'primeng/dropdown';
import { ButtonModule } from 'primeng/button';
import { PaginatorModule } from 'primeng/paginator';

@NgModule({
  declarations: [ HeaderComponent ],
  imports: [
    CommonModule,
    PaginatorModule,
    MatFormFieldModule,
    MatSelectModule,
    MatAutocompleteModule,
    MatProgressSpinnerModule,
    MatCheckboxModule,
    RatingModule,
    InputTextareaModule,
    ConfirmDialogModule,
    MatInputModule,
    ToastModule,
    InputTextModule,
    PasswordModule,
    MenuModule,
    DropdownModule,
    ButtonModule
  ],
  exports: [
    PaginatorModule,
    MatFormFieldModule,
    MatSelectModule,
    MatAutocompleteModule,
    MatProgressSpinnerModule,
    MatCheckboxModule,
    RatingModule,
    InputTextareaModule,
    ConfirmDialogModule,
    ToastModule,
    InputTextModule,
    PasswordModule,
    MenuModule,
    MatInputModule,
    HeaderComponent,
    DropdownModule,
    ButtonModule
  ],
  providers: [ConfirmationService, MessageService]
})
export class SharedMaterialModule {}
