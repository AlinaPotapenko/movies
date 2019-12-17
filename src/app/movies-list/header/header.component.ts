import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

import { MenuItem } from "primeng/api";
import { ConfirmationService } from 'primeng/api';

import { AuthService } from '../../Shared/services/auth.service';

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"]
})
export class HeaderComponent implements OnInit {
  items: MenuItem[];
  userInfo;
  userName: string;

  constructor(private confirmationService: ConfirmationService, private _router: Router,
              private _authService: AuthService) {
  }

  ngOnInit() {

    this._authService.broadcast.subscribe(msg => this.userName = msg);

    this.items = [
      { label: 'My profile', icon: 'fa fa-home' },
      { label: 'Logout', icon: 'pi pi-sign-out' }
    ];
  }

  navigateThroughMenu(item) {
    if (item.toElement.innerText == 'Logout') {
        (this.confirm());
    } else if (item.toElement.innerText == 'My profile') {
        this._router.navigate(['profile']).then();
    }
  }

  confirm() {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to log out?',
      accept: () => {
        this._router.navigate(['login']).then();
        localStorage.clear();
      },
      reject: () => {
        return;
      }
    });
  }
}
