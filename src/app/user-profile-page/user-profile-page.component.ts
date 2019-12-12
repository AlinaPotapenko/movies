import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: "app-user-profile-page",
  templateUrl: "./user-profile-page.component.html",
  styleUrls: ["./user-profile-page.component.scss"]
})
export class UserProfilePageComponent implements OnInit {
  public userName: string;

  constructor(private _router: Router) {}

  ngOnInit() {
    this.userName = JSON.parse(localStorage.getItem('info')).name;
  }

  navigateToMovies() {
    this._router.navigate(['movies']).then();
  }
}
