import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { MenuItem } from "primeng/api";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"]
})
export class HeaderComponent implements OnInit {
  public userName: string;
  items: MenuItem[];

  constructor(private _router: Router) {}

  ngOnInit() {
    this.userName = JSON.parse(localStorage.getItem("info")).name;

    this.items = [
      { label: 'My profile', icon: 'fa fa-home' },
      { label: 'Logout', icon: 'pi pi-sign-out' }
    ];
  }

  navigateThroughMenu(item) {
    console.log(item)
    if (item.toElement.innerText == 'Logout') {
        this._router.navigate(['login']).then();
        localStorage.clear();
    } else if (item.toElement.innerText == 'My profile') {
        this._router.navigate([`profile/${this.userName}`]).then();
    }
  }
}
