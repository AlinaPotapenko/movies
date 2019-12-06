import { Component, OnInit, Inject } from '@angular/core';
import { FormControl, FormGroup} from '@angular/forms';
import { HttpService } from '../Shared/services/http.service';
import { Router} from '@angular/router';
import {MatPaginatorModule} from '@angular/material/paginator';
import {PageEvent} from '@angular/material/paginator';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { Observable } from 'rxjs';
import {map, startWith} from 'rxjs/operators';

export interface Ttype {
  value: string;
  viewValue: string;
}

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
  date = new Date();
  currentYear = this.date.getFullYear(); 
  typeParam: String = "";
  yearParam = "";
  showSpinner = false;


  types: Ttype[] = [
  { value: "movie", viewValue: "Movie" },
  { value: "series", viewValue: "Series" },
  { value: "episode", viewValue: "Episode" }
  ];

  y = new FormControl();
  years: number[] = [];
  filteredYears: Observable<number[]>;
  
  constructor(private _httpService: HttpService, private _router: Router) {
    
    this.searchControl = new FormGroup({
      s: new FormControl(),
    });    
    for (let i = this.currentYear; i >= 1900; i--) {
      this.years.push(i);
    }
    
  }

  ngOnInit() {
    this.searchControl.valueChanges
    .subscribe((value) => {
      let movieTitle: string = value.s;
      if (movieTitle === '') {
        this.movies = [];
      }
    })
    this.filteredYears = this.y.valueChanges
      .pipe(
        startWith(''),
        map(value => this._filter(value))
      );
    
  }
  
  private _filter(value) {
    return this.years.filter(year => year.toString().includes(value));
  }

  settingType(type) {
    return this.typeParam = type.value; 
  }

  settingYear(year) {
    return this.yearParam = year.option.value;
  }

  submitting(page?) {
    this.showSpinner = true;
    
    let params: any = {};
    
    if (page) {
      params.page = page;
    }
    params.type = this.typeParam;
    params.y = this.yearParam;

    Object.keys(this.searchControl.value)
      .filter(element => this.searchControl.controls[element].value)
      .map(elem => params[elem] = this.searchControl.controls[elem].value);
      console.log(params)


    this._httpService.get(params)
      .subscribe(data => {
         if (data.Search) {
          this.movies = data.Search;
          this.totalResults = data.totalResults;
          
          console.log(this.movies);
        }
        this.showSpinner = false;
      });
  }

  validate(value) {
    if(value == "") {
      document.getElementById("sValue").style.boxShadow = "inset 0 0 0.3em red";
        setTimeout(function() {
        document.getElementById("sValue").style.boxShadow = ""; 
      }, 3000);
    } else {
      document.getElementById("sValue").style.boxShadow = "";
    }
 }

 
  public doPaginate(e?:PageEvent) {
    this.submitting(e.pageIndex + 1);
  }

  navigateToDetails(movie) {
  this._router.navigate([`movies/details/${movie.imdbID}`]).then();
  }

}


