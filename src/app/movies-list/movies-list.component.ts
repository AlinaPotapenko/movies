import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { HttpService } from '../Shared/services/http.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-movies-list',
  templateUrl: './movies-list.component.html',
  styleUrls: ['./movies-list.component.scss']
})



export class MoviesListComponent implements OnInit{
  searchControl: FormGroup;
  movies: any[] = [];

  
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
    if (page) {
      params.page = page;
    }
    Object.keys(this.searchControl.value)
      .filter(element => this.searchControl.controls[element].value)
      .map(elem => params[elem] = this.searchControl.controls[elem].value);
      

    this._httpService.get(params)
      .subscribe(data => {
        if (data.Search) {
          this.movies = data.Search;

          console.log(this.movies);
      
        }
      });
  }
navigateToDetails(movie) {
  this._router.navigate([`movies/details/${movie.imdbID}`]).then();
}


}


  

