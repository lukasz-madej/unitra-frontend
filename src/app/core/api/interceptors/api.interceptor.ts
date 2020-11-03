import { Injectable } from '@angular/core';
import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpParams, HttpRequest } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { LoadingService } from '../../../shared/services/loading/loading.service';
import { catchError, finalize } from 'rxjs/operators';
import { SnackBarService } from '../../../shared/services/snack-bar/snack-bar.service';
import { InterceptorHttpParams, InterceptorMetadata } from '../../../shared/models/interceptor-http-params.model';

@Injectable()
export class ApiInterceptor implements HttpInterceptor {

  constructor(
    private _loadingService: LoadingService,
    private _snackBarService: SnackBarService
  ) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this._showLoading((request.params as InterceptorHttpParams).interceptorMetadata);

    return next.handle(request)
      .pipe(
        catchError(this._showErrorSnackBar),
        finalize((): void => {
          this._hideLoading((request.params as InterceptorHttpParams).interceptorMetadata);
        })
      );
  }

  private _showErrorSnackBar = (error: HttpErrorResponse): Observable<any> => {
    if (error.status >= 500) {
      this._snackBarService.info('Coś poszło nie tak. Sróbuj ponownie później.');
    }
    return throwError(error);
  }

  private _showLoading = (interceptorMetadata: InterceptorMetadata): void => {
    if (!interceptorMetadata.disableLoadingIndicator) {
      interceptorMetadata.modal ? this._loadingService.showModal() : this._loadingService.show();
    }
  }

  private _hideLoading = (interceptorMetadata: InterceptorMetadata): void => {
    if (!interceptorMetadata.disableLoadingIndicator) {
      interceptorMetadata.modal ? this._loadingService.hideModal() : this._loadingService.hide();
    }
  }
}
