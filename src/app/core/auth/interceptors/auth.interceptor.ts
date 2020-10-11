import { Injectable } from '@angular/core';
import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { catchError, finalize } from 'rxjs/operators';
import { LoadingService } from '../../../shared/services/loading/loading.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private _authService: AuthService, private _loadingService: LoadingService) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token: string = this._authService.token;

    if (token) {
      request = request.clone({ headers: request.headers.set('Authorization', `Bearer ${token}`) });
    }

    if (!request.headers.has('Content-Type')) {
      request = request.clone({ headers: request.headers.set('Content-Type', 'application/json') });
    }

    request = request.clone({ headers: request.headers.set('Accept', 'application/json') });

    this._loadingService.show();

    return next.handle(request)
      .pipe(
        catchError((error: HttpErrorResponse): Observable<any> => {
          if (error.status === 401) {
            this._authService.logout();
          }
          return throwError(error);
        }),
        finalize((): void => {
          this._loadingService.hide();
        })
      );
  }
}
