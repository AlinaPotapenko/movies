import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { HttpService } from '../Shared/services/http.service';

@Component({
  selector: 'app-movies-list',
  templateUrl: './movies-list.component.html',
  styleUrls: ['./movies-list.component.scss']
})
export class MoviesListComponent implements OnInit {
  searchControl: FormGroup;
  movies: any[] = [];

  constructor(private _httpService: HttpService) {
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

  submitting() {
    let params = {};
    Object.keys(this.searchControl.value)
      .filter(element => this.searchControl.controls[element].value)
      .map(elem => params[elem] = this.searchControl.controls[elem].value);
    
    this._httpService.get(params)
      .subscribe(data => {
        this.movies = data.Search;
      });
  }
}
