import { TestBed } from '@angular/core/testing';
import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';

import { DataService } from './data.service';

describe('DataService', () => {
  let service: DataService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [DataService]
    });
    service = TestBed.inject(DataService);
  });

  test('getMovies function should get movies list through API call', () => {
    let movies = { 
      Search: ['movie1', 'movie2'],
      totalResults: '20',
      Response: 'true' 
    };
    let dataService = TestBed.get(DataService);
    let http = TestBed.get(HttpTestingController);
    let moviesResponse;

    dataService.getMovies({s: 'movie'}).subscribe(response => {
      moviesResponse = response;
    });

    http.expectOne('http://www.omdbapi.com/?apikey=15cd9fc8&plot=full&s=movie').flush(movies);
     expect(moviesResponse).toEqual(movies);
  });
});
