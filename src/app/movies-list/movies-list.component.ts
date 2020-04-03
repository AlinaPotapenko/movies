import { Component, OnInit, ElementRef, Renderer2, ViewChild, OnDestroy } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, startWith, finalize } from 'rxjs/operators';

import { HttpService } from '../Shared/services/http.service';
import { IMoviesList, IMovieType } from '../Shared/models';
import { untilDestroyed } from 'ngx-take-until-destroy';
import { DataService } from '../Shared/services/data.service';

@Component({
  selector: 'app-movies-list',
  templateUrl: './movies-list.component.html',
  styleUrls: ['./movies-list.component.scss']
})

export class MoviesListComponent implements OnInit, OnDestroy {

  @ViewChild('sValue') sValue: ElementRef;
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
  years: number[] = [];
  filteredYears: Observable<number[]>;
  
  constructor(private _dataService: DataService, private _router: Router, 
              private _renderer: Renderer2) {
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

    this.filteredYears = this.searchForm.controls.y.valueChanges
      .pipe(
        startWith(''),
          map(value => this._filter(value)));
  }

  createYearsFilter() {
   let currentYear = new Date().getFullYear()
    for (let i = currentYear; i >= 1900; i--) {
      this.years.push(i);
    }  
  }
  
  private _filter(value) {
     return this.years.filter(year => year.toString().includes(value));
  }

  submitParams(page?) {
    this.showSpinner = true;
    
    let params: any = {};
    if (page) {
      params.page = page;
    }
    Object.keys(this.searchForm.value)
      .filter(element => this.searchForm.controls[element].value)
        .map(elem => params[elem] = this.searchForm.controls[elem].value);
    
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

  validate(value) {
    if(value == "") {
      this._renderer.setStyle(this.sValue.nativeElement,'box-shadow', 'inset 0 0 0.3em red');
        setTimeout(() => {
        this._renderer.setStyle(this.sValue.nativeElement,'box-shadow', ''); 
        }, 3000);
    } else {
      this._renderer.setStyle(this.sValue.nativeElement,'box-shadow', '');
    }
  }
 
  doPaginate(e?) {
    this.submitParams(e.pageIndex + 1);
  }

  navigateToDetails(movie) {
    this._router.navigate([`movies/details/${movie.imdbID}`]).then();
  }

  ngOnDestroy() {}

}


