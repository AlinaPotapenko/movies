import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, startWith, finalize } from 'rxjs/operators';

import { IMoviesList, IMovieType } from '../Shared/models';
import { untilDestroyed } from 'ngx-take-until-destroy';
import { DataService } from '../Shared/services/data.service';

@Component({
  selector: 'app-movies-list',
  templateUrl: './movies-list.component.html',
  styleUrls: ['./movies-list.component.scss']
})

export class MoviesListComponent implements OnInit, OnDestroy {
  searchForm: FormGroup; 
  movies: IMoviesList[] = [];
  totalResults: string;
  showSpinner: boolean = false;
  showAdvancedPanel: boolean = false;
  types: IMovieType[] = [
    { value: 'movie', viewValue: 'Movie' },
    { value: 'series', viewValue: 'Series' },
    { value: 'episode', viewValue: 'Episode' }
  ];
  years: Array<object> = [];
  isInvalid: boolean = false;

  constructor(private _dataService: DataService, private _router: Router) {
    this.searchForm = new FormGroup({
      s: new FormControl(),
      type: new FormControl(),
      y: new FormControl()
    });  

    this.createYearsFilter();
  }

  ngOnInit() {
    this.searchForm.valueChanges.pipe(untilDestroyed(this))
      .subscribe((value) => {
        if (!value.s) { this.movies = [] };
    });
  }

  createYearsFilter() {
   let currentYear = new Date().getFullYear()
    for (let i = currentYear; i >= 1900; i--) {
      this.years.push({'value': i});
    }  
  }

  submitParams(page?) {
    if (this.searchForm.invalid) return;
    this.showSpinner = true;
    
    let params: any = {};
    if (page) {
      params.page = page;
    }
    Object.keys(this.searchForm.value)
      .filter(element => this.searchForm.controls[element].value)
        .map(elem => {
          if (elem == 'type' || elem == 'y') {
            params[elem] = this.searchForm.controls[elem].value.value;
          } else {
            params[elem] = this.searchForm.controls[elem].value;
          }
        });
    
    this.getMovies(params);
  }
    
  getMovies(params) {
    this._dataService.getMovies(params).pipe(finalize(() => 
    this.showSpinner = false))
      .subscribe(data => {
       if (data.Search) {
          this.movies = data.Search;
          this.totalResults = data.totalResults;
       }
    });
  }

  toggleAdvancedPanel() {
    this.showAdvancedPanel = !this.showAdvancedPanel;
  }

  validateInput(value) {
    if (!value) {
      this.isInvalid = true;
      setTimeout(() => {
        this.isInvalid = false;
      }, 3000)
    };
  }
 
  doPaginate(e?) {
    this.submitParams(e.page+1);
  }

  navigateToDetails(movie) {
    this._router.navigate([`movies/details/${movie.imdbID}`]).then();
  }

  ngOnDestroy() {}

}


