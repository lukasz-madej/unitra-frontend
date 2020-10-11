import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../auth/services/auth.service';

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.scss']
})
export class TopBarComponent implements OnInit {

  notificationsCount: number;

  constructor(private _authService: AuthService) {
    this.notificationsCount = 15;
  }

  ngOnInit(): void {
  }

  onLogout = (): void => {
    this._authService.logout();
  }
}
