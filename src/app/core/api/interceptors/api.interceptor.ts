import { Injectable } from '@angular/core';
import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { LoadingService } from '../../../shared/services/loading/loading.service';
import { catchError, finalize } from 'rxjs/operators';
import { SnackBarService } from '../../../shared/services/snack-bar/snack-bar.service';

@Injectable()
export class ApiInterceptor implements HttpInterceptor {

  constructor(
    private _loadingService: LoadingService,
    private _snackBarService: SnackBarService
  ) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this._loadingService.show();

    return next.handle(request)
      .pipe(
        catchError(this._showErrorSnackBar),
        finalize((): void => {
          this._loadingService.hide();
        })
      );
  }

  private _showErrorSnackBar = (error: HttpErrorResponse): Observable<any> => {
    if (error.status >= 500) {
      this._snackBarService.info('Coś poszło nie tak. Sróbuj ponownie później.');
    }
    return throwError(error);
  }
}
