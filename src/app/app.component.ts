import { Component, OnInit } from '@angular/core';
import { LoadingService } from './shared/services/loading.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  private _unsubscribe$: Subject<boolean> = new Subject<boolean>();

  showLoadingIndicator: boolean;

  constructor(private _loadingService: LoadingService) {
    this.showLoadingIndicator = false;
  }

  ngOnInit(): void {
    this._loadingService.loading$
      .pipe(
        takeUntil(this._unsubscribe$)
      )
      .subscribe((showLoading: boolean): void => {
        this.showLoadingIndicator = showLoading;
      });
  }
}
