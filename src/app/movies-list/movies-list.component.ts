import { Component, OnInit, Inject, ElementRef, Renderer2, ViewChild, OnDestroy } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router, NavigationExtras, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map, startWith, finalize } from 'rxjs/operators';

import { HttpService } from '../Shared/services/http.service';
import { AuthService } from '../Shared/services/auth.service';
import { SharedModule } from '../Shared/shared.module';

export interface Ttype {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-movies-list',
  templateUrl: './movies-list.component.html',
  styleUrls: ['./movies-list.component.scss']
})


export class MoviesListComponent implements OnInit, OnDestroy{

  @ViewChild('sValue', {static: false}) sValue: ElementRef;

  searchControl: FormGroup; 
  movies: any[] = [];
  totalResults: number;
  date = new Date();
  currentYear = this.date.getFullYear(); 
  typeParam: String = '';
  yearParam = '';
  showSpinner = false;
  public id;
  public userInfo;
  valueChanges;


  types: Ttype[] = [
    { value: 'movie', viewValue: 'Movie' },
    { value: 'series', viewValue: 'Series' },
    { value: 'episode', viewValue: 'Episode' }
  ];

  y = new FormControl();
  years: number[] = [];
  filteredYears: Observable<number[]>;
  
  constructor(private _route: ActivatedRoute, private _httpService: HttpService, private _router: Router, //private messageService: MessageService should be added for error buttons
              private _renderer: Renderer2, private _authService: AuthService) {
    
        this.searchControl = new FormGroup({
        s: new FormControl(),
        });  

        for (let i = this.currentYear; i >= 1900; i--) {
        this.years.push(i);
        }  
  }

  ngOnInit() {

    this.valueChanges = this.searchControl.valueChanges
      .subscribe((value) => {
        let movieTitle: string = value.s;
        if (movieTitle === '') {
          this.movies = [];
        }
    });

    this.filteredYears = this.y.valueChanges
      .pipe(
        startWith(''),
          map(value => this._filter(value)));
  }

  ngOnDestroy() {
    this.valueChanges.unsubscribe();
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

    this._httpService.get(params)
      .pipe(
        finalize(() => this.showSpinner = false)
      )
        .subscribe(data => {
         if (data.Search) {
            this.movies = data.Search;
            this.totalResults = data.totalResults;
         }
      });
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
 
  public doPaginate(e?) {
    this.submitting(e.pageIndex + 1);
  }

  navigateToDetails(movie) {
    this._router.navigate([`movies/details/${movie.imdbID}`]).then();
  }

}


