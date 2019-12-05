import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/app/Shared/services/http.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.scss']
})
export class MovieDetailsComponent implements OnInit{
  public imdbId: string;
  public movie: any[] = [];
  public showSpinner = false;
  

  constructor(private _route: ActivatedRoute, private _httpService: HttpService,
    private _router: Router) {
   
    };

    ngOnInit() {
      this.showSpinner = true;
      this._route.params.subscribe(params => this.imdbId = params.imdbID)
      console.log(this.imdbId);
      let params = {
        i: this.imdbId
      };
      console.log(params);

      this._httpService.get(params)
        .subscribe(data => {
          if (data) {
            this.movie = data;
          }
          console.log(this.movie);
          this.showSpinner = false;
        });  

      }
    
    
  }
 

  




