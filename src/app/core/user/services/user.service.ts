import { Injectable } from '@angular/core';
import { User } from '../models/user.model';
import { ApiService } from '../../api/services/api.service';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private _user: User;

  get user(): User {
    return this._user;
  }

  set user(user: User) {
    this._user = user;
  }

  constructor(private _api: ApiService) { }

  getCurrent = (): Observable<User> => {
    return this._api.get('users/current')
      .pipe(
        take(1),
        map(this.mapUser),
      );
  }

  isAdmin = (): boolean => this.user.isAdmin;

  mapUser = (response: any): User => {
    const { username, admin, created_at, updated_at } = response;

    return {
      username,
      isAdmin: admin,
      createdAt: new Date(created_at),
      updatedAt: new Date(updated_at)
    };
  }
}
