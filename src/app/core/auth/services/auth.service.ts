import { Injectable } from '@angular/core';
import { Credentials } from '../../../modules/login/models/login.model';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _token: string;
  private _isLoggedIn: boolean;

  get token(): string {
    if (this._token) {
      return this._token;
    } else {
      this._token = localStorage.getItem('UNITRA_TOKEN');
    }
  }
  get isLoggedIn(): boolean {
    return this._isLoggedIn;
  }

  constructor() {
    this._isLoggedIn = false;
  }

  authenticate = (credentials: Credentials): Observable<any> => {
    this._isLoggedIn = false;
    this._token = 'TESTTOKEN';
    localStorage.setItem('UNITRA_TOKEN', this._token);

    return of(this.isLoggedIn)
      .pipe(
        delay(2000)
      );
  }
}
