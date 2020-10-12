import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { SnackBarService } from '../../../shared/services/snack-bar/snack-bar.service';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private readonly _apiUrl: string;

  constructor(private _http: HttpClient, private _snackBarService: SnackBarService) {
    this._apiUrl = environment.apiUrl;
  }

  get = (endpoint: string): Observable<any> => {
    return this._http.get(this._getUrl(endpoint))
      .pipe(
        catchError(this._showErrorSnackBar)
      );
  }

  post = (endpoint: string, payload: any): Observable<any> => {
    return this._http.post(this._getUrl(endpoint), payload)
      .pipe(
        catchError(this._showErrorSnackBar)
      );
  }

  delete = (endpoint: string): Observable<any> => {
    return this._http.delete(this._getUrl(endpoint))
      .pipe(
        catchError(this._showErrorSnackBar)
      );
  }

  private _getUrl = (endpoint: string): string => this._apiUrl + endpoint;

  private _showErrorSnackBar = (error: HttpErrorResponse): Observable<any> => {
    if (error.status >= 500) {
      this._snackBarService.open('Coś poszło nie tak. Sróbuj ponownie później.');
    }
    return throwError(error);
  }
}
