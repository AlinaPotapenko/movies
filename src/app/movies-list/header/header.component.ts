import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  public userName: string;

  constructor(private _router: Router) { }

  ngOnInit() {
  		this.userName = JSON.parse(localStorage.getItem('info')).name; 
  }

  logOut() {
    this._router.navigate(['login']).then();
    localStorage.clear();
  }

}
