import { Component, OnInit, ViewChild, ElementRef, Renderer2 } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { HttpService } from 'src/app/Shared/services/';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.scss']
})

export class MovieDetailsComponent implements OnInit {

  @ViewChild('commentRef', {static: false}) commentRef: ElementRef;

  public imdbId: string;
  public movie: any[] = [];
  public showSpinner = false;
  public val: number;
  public showInput = true;
  public msg: string = '';
  public favMsg: string = 'Add to Favourites';
  condition: boolean = true;
  
  toggle() {
    this.condition = !this.condition;
  }

  constructor(private _route: ActivatedRoute, private _httpService: HttpService,
              private _router: Router, private _renderer: Renderer2) {
  };

  ngOnInit() {
      this._route.data.subscribe(data => console.log(data));
      this.showSpinner = true;
      this._route.params.subscribe(params => this.imdbId = params.imdbID)
        let params = {
          i: this.imdbId
        };

      this._httpService.get(params)
        .subscribe(data => {
          if (data) {
            this.movie = data;
          }
            this.showSpinner = false;
        });  
  }

  validateComment(comment) {
      if (!comment) {
        this._renderer.setStyle(this.commentRef.nativeElement,'box-shadow', 'inset 0 0 0.3em red');
          setTimeout(() => {
            this._renderer.setStyle(this.commentRef.nativeElement,'box-shadow', ''); 
          }, 3000);
      } else {
          this.showInput = false;
          this.msg = 'Thank you for your comment. It will appear after moderation.'; 
          localStorage.setItem('Comment', comment);   
      }
  }

  validateFav(checked) {
      if (checked) {
        this.favMsg = 'Added to Favourites';
        localStorage.setItem('Favourite', 'true');
      } else {
         this.favMsg = 'Add to Favourites';
         localStorage.setItem('Favourite', 'false');
      }
  } 

  saveRate(rate) {
      localStorage.setItem('Rate', rate);
  } 

}
    
 

  




