import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { HttpService } from '../Shared/services/http.service';
import { Router } from '@angular/router';
import {MatPaginatorModule} from '@angular/material/paginator';
import {PageEvent} from '@angular/material/paginator';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
// import {MatDialogModule, MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

// export interface DialogData {
//   animal: string;
//   name: string;
// }

// export interface Type {
//   value: string;
//   viewValue: string;
// }

@Component({
  selector: 'app-movies-list',
  templateUrl: './movies-list.component.html',
  styleUrls: ['./movies-list.component.scss']
})



export class MoviesListComponent implements OnInit{
  searchControl: FormGroup;
  movies: any[] = [];
  
  totalResults: number;
  pageEvent: PageEvent;

  // animal: string;
  // name: string;
  
  constructor(private _httpService: HttpService, private _router: Router) {
    this.searchControl = new FormGroup({
      s: new FormControl(),
      type: new FormControl(),
      y: new FormControl()
    });
  }

  ngOnInit() {
    this.searchControl.valueChanges
    .subscribe((value) => {
      let movieTitle: string = value.s;
      if (movieTitle === '') {
        this.movies = [];
      }
    })
  }


  submitting(page?: number) {

    let params: any = {};
    if (page ) {
      params.page = page;
    }
    Object.keys(this.searchControl.value)
      .filter(element => this.searchControl.controls[element].value)
      .map(elem => params[elem] = this.searchControl.controls[elem].value);

    this._httpService.get(params)
      .subscribe(data => {
        if (data.Search) {
          this.movies = data.Search;
          this.totalResults = data.totalResults;

          console.log(this.movies);
      
        }
      });
  }

  // openDialog(): void {
  //   const dialogRef = this.dialog.open(AdvancedSearchOptions, {
  //     width: '250px',
  //     data: {name: this.name, animal: this.animal}
  //   });

  //   dialogRef.afterClosed().subscribe(result => {
  //     console.log('The dialog was closed');
  //     this.animal = result;
  //   });
  // }

  public doPaginate(e?:PageEvent) {
    this.submitting(e.pageIndex + 1);
  }

  navigateToDetails(movie) {
  this._router.navigate([`movies/details/${movie.imdbID}`]).then();
  }


}




  
// @Component({
//   selector: 'advanced-search-options',
//   templateUrl: 'advanced-search-options.html',
// })
// export class AdvancedSearchOptions {

//   // constructor(
//   //   public dialogRef: MatDialogRef<AdvancedSearchOptions>,
//   //   @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

//   // onNoClick(): void {
//   //   this.dialogRef.close();
//   // }

// }
