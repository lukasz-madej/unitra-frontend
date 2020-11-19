import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { User } from '../models/user.model';
import { UserService } from '../services/user.service';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { ErrorService } from '../../../shared/services/error/error.service';

@Injectable({
  providedIn: 'root'
})
export class UserResolver implements Resolve<User> {
  constructor(private _userService: UserService, private _errorService: ErrorService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<User> {
    return this._userService.getCurrent()
      .pipe(
        tap((response: User): void => {
          this._userService.user = response;
        }, (): void => {
          this._errorService.handleAuthError();
        })
      );
  }
}
