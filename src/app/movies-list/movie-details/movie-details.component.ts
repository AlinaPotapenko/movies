import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/app/Shared/services/http.service';
import { Router, ActivatedRoute } from '@angular/router';
import {ConfirmationService} from 'primeng/api';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import {Message} from 'primeng/api';


@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.scss']
})
export class MovieDetailsComponent implements OnInit {
  public imdbId: string;
  public movie: any[] = [];
  public showSpinner = false;
  public val: number;
  public showInput = true;
  public msg: string = "";
  public favMsg: string = "Add to Favourites";
  
  

  constructor(private confirmationService: ConfirmationService, private _route: ActivatedRoute, private _httpService: HttpService,
    private _router: Router) {
    };

    ngOnInit() {
      this._route.data.subscribe(data => console.log(data));
      this.showSpinner = true;
      this._route.params.subscribe(params => this.imdbId = params.imdbID)
      console.log(this.imdbId);
      let params = {
        i: this.imdbId
      };

      this._httpService.get(params)
        .subscribe(data => {
          if (data) {
            this.movie = data;
          }
          console.log(this.movie);
          this.showSpinner = false;
        });  

      }

    validateComment(comment) {
      if (!comment) {
        // this.confirm();
        document.getElementById("float-input").style.boxShadow = "inset 0 0 0.3em red";
        setTimeout(function() {
        document.getElementById("float-input").style.boxShadow = ""; 
      }, 3000);
      } else {
        // this.confirm()
        this.showInput = false;
        this.msg = "Thank you for your comment. It will appear after moderation."; 
        localStorage.setItem('Comment:', comment);   
  }
  }

    validateFav(checked) {
      if (checked) {
        this.favMsg = "Added to Favourites";
        localStorage.setItem('Favourite:', 'true');
      } else {
         this.favMsg = "Add to Favourites";
        localStorage.setItem('Favourite:', 'false');
      }
    } 

     saveRate(rate) {
       localStorage.setItem('Rate:', rate);
     } 

     // confirm() {
     //   this.confirmationService.confirm({
     //        message: 'Are you sure that you want to submit this comment?',
     //        header: "Submitting",
     //        // accept: () => {
     //        //    return "Thank you"
     //        // }
     //    });
     // }

    }
    
 

  




