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

  get = (endpoint: string, query: any = {}): Observable<any> =>
    this._http.get(this._getUrl(endpoint), { params: this._parseParams(query) })

  post = (endpoint: string, payload: any, options: any = {}): Observable<any> =>
    this._http.post(this._getUrl(endpoint), payload, options)

  put = (endpoint: string, payload: any): Observable<any> =>
    this._http.put(this._getUrl(endpoint), payload)

  delete = (endpoint: string): Observable<any> =>
    this._http.delete(this._getUrl(endpoint))

  private _getUrl = (endpoint: string): string => this._apiUrl + endpoint;

  private _parseParams = (params: any): any =>
    Object.keys(params).reduce((acc: any, key: string): void =>
      (params[key] === null ? acc : {...acc, [key]: params[key]}), {})
}
