import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private readonly _apiUrl: string;

  constructor(private _http: HttpClient) {
    this._apiUrl = environment.apiUrl;
  }

  get = (endpoint: string): Observable<any> => {
    return this._http.get(this._getUrl(endpoint));
  }

  post = (endpoint: string, payload: any): Observable<any> => {
    return this._http.post(this._getUrl(endpoint), payload);
  }

  delete = (endpoint: string): Observable<any> => {
    return this._http.delete(this._getUrl(endpoint));
  }

  private _getUrl = (endpoint: string): string => this._apiUrl + endpoint;
}
