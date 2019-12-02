import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { HttpService } from '../Shared/services/http.service';
import { Router } from '@angular/router';
import {MatPaginatorModule} from '@angular/material/paginator';
import {PageEvent} from '@angular/material/paginator';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';


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

  // types: Type[] = [
  //   {value: 'movie-0', viewValue: 'Movie'},
  //   {value: 'series-1', viewValue: 'Series'},
  //   {value: 'episode-2', viewValue: 'Episode'}
  // ];

  
  constructor(private _httpService: HttpService, private _router: Router) {
    this.searchControl = new FormGroup({
      s: new FormControl(),
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

  public doPaginate(e?:PageEvent) {
    this.submitting(e.pageIndex + 1);
  }
navigateToDetails(movie) {
  this._router.navigate([`movies/details/${movie.imdbID}`]).then();
}


}


  

