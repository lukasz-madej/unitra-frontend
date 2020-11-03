import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { LoadingService } from '../../services/loading/loading.service';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit, OnDestroy {

  private _unsubscribe$: Subject<boolean> = new Subject<boolean>();

  showLoadingIndicator: boolean;

  constructor(private _loadingService: LoadingService, private _changeDetectorRef: ChangeDetectorRef) {
    this.showLoadingIndicator = false;
  }

  ngOnInit(): void {
    this._loadingService.loadingModal$
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
