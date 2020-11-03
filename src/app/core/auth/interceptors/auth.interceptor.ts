import { Injectable } from '@angular/core';
import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { catchError } from 'rxjs/operators';
import { ErrorService } from '../../../shared/services/error/error.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(
    private _authService: AuthService,
    private _errorService: ErrorService
  ) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token: string = this._authService.token;

    if (token) {
      request = request.clone({ headers: request.headers.set('Authorization', `Bearer ${token}`) });
    }

    request = request.clone({ headers: request.headers.set('Accept', 'application/json') });

    return next.handle(request)
      .pipe(
        catchError((error: HttpErrorResponse): Observable<any> => {
          if (error.status === 401) {
            this._errorService.handleAuthError();
          }
          return throwError(error);
        })
      );
  }
}
