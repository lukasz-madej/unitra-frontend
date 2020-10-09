import { Injectable } from '@angular/core';
import { Credentials } from '../../../modules/login/models/login.model';
import { Observable } from 'rxjs';
import { map, shareReplay, tap } from 'rxjs/operators';
import { ApiService } from '../../api/services/api.service';
import { environment } from '../../../../environments/environment';
import { User } from '../../../shared/models/user.model';
import * as moment from 'moment';
import { Router } from '@angular/router';

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

  constructor(private _api: ApiService, private _router: Router) {
  }

  authenticate = (credentials: Credentials): Observable<User> => {
    return this._api.post('users/authenticate', credentials)
      .pipe(
        tap((response: any): void => {
          console.log(response);
          this.token = response.token;
          this.expiresAt = JSON.stringify(moment().add(response.expiresIn, 'seconds').valueOf());
        }),
        map((response: any): User => {
          const { username, admin, created_at, updated_at } = response.user;

          return {
            username,
            isAdmin: admin,
            createdAt: new Date(created_at),
            updatedAt: new Date(updated_at)
          };
        }),
        shareReplay()
      );
  }

  logout = (): void => {
    localStorage.removeItem(environment.tokenKey);
    localStorage.removeItem(environment.expirationKey);
    this._router.navigateByUrl('/login');
  }
}
