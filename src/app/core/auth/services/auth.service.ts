import { Injectable } from '@angular/core';
import { Credentials } from '../../../modules/login/models/login.model';
import { Observable } from 'rxjs';
import { map, shareReplay, tap } from 'rxjs/operators';
import { ApiService } from '../../api/services/api.service';
import { environment } from '../../../../environments/environment';
import { User } from '../../user/models/user.model';
import * as moment from 'moment';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { UserService } from '../../user/services/user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _token: string;

  get isLoggedIn(): boolean {
    return moment().isBefore(moment(JSON.parse(this.expiresAt)));
  }

  get token(): string {
    return this._token || localStorage.getItem(environment.tokenKey) || null;
  }
  set token(token: string) {
    localStorage.setItem(environment.tokenKey, token);
    this._token = token;
  }

  get expiresAt(): string {
    return localStorage.getItem(environment.expirationKey);
  }
  set expiresAt(expiresAt: string) {
    localStorage.setItem(environment.expirationKey, expiresAt);
  }

  constructor(
    private _api: ApiService,
    private _userService: UserService,
    private _router: Router,
    private _dialog: MatDialog
  ) {
  }

  authenticate = (credentials: Credentials): Observable<User> => {
    return this._api.post('users/authenticate', credentials)
      .pipe(
        tap((response: any): void => {
          this.token = response.token;
          this.expiresAt = JSON.stringify(moment().add(response.expiresIn, 'seconds').valueOf());
        }),
        map((response: any): User => this._userService.mapUser(response.user)),
        shareReplay()
      );
  }

  logout = (): void => {
    localStorage.removeItem(environment.tokenKey);
    localStorage.removeItem(environment.expirationKey);
    this._dialog.closeAll();
    this._router.navigateByUrl('/login');
  }
}
