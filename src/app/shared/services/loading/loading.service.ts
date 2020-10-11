import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {

  private _count = 0;

  loading$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  show = (): void => {
    this._count += 1;
    this._handleLoading();
  }

  hide = (): void => {
    this._count -= 1;
    this._handleLoading();
  }

  private _handleLoading = (): void => {
    this.loading$.next(this._count > 0);
  }
}
