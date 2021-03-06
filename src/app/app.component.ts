import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { LoadingService } from './shared/services/loading/loading.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {

  private _unsubscribe$: Subject<boolean> = new Subject<boolean>();

  showLoadingIndicator: boolean;

  constructor(private _loadingService: LoadingService, private _changeDetectorRef: ChangeDetectorRef) {
    this.showLoadingIndicator = false;
  }

  ngOnInit(): void {
    this._loadingService.loading$
      .pipe(
        takeUntil(this._unsubscribe$)
      )
      .subscribe((showLoading: boolean): void => {
        this.showLoadingIndicator = showLoading;
        this._changeDetectorRef.detectChanges();
      });
  }

  ngOnDestroy(): void {
    this._unsubscribe$.next(true);
    this._unsubscribe$.complete();
  }
}
