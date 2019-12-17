import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../Shared/services';

@Component({
  selector: "app-user-profile-page",
  templateUrl: "./user-profile-page.component.html",
  styleUrls: ["./user-profile-page.component.scss"]
})
export class UserProfilePageComponent implements OnInit {
  userName: string;

  constructor(private _router: Router, private _authService: AuthService) {}

  ngOnInit() {
    this._authService.broadcast.subscribe(msg => this. userName = msg);

  }

  navigateToMovies() {
    this._router.navigate(['movies']).then();
  }
}
