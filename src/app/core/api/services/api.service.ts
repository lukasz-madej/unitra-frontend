import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { Observable } from 'rxjs';
import { InterceptorHttpParams, InterceptorMetadata } from '../../../shared/models/interceptor-http-params.model';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private readonly _apiUrl: string;

  constructor(private _http: HttpClient) {
    this._apiUrl = environment.apiUrl;
  }

  get = (
    endpoint: string,
    query: any = {},
    interceptorMetadata?: InterceptorMetadata
  ): Observable<any> =>
    this._http.get(this._getUrl(endpoint), this._parseOptions({}, query, interceptorMetadata))

  post = (
    endpoint: string,
    payload: any,
    options: any = {},
    interceptorMetadata?: InterceptorMetadata
  ): Observable<any> =>
    this._http.post(this._getUrl(endpoint), payload, this._parseOptions(options, {}, interceptorMetadata))

  put = (
    endpoint: string,
    payload: any,
    options: any = {},
    interceptorMetadata?: InterceptorMetadata
  ): Observable<any> =>
    this._http.put(this._getUrl(endpoint), payload, this._parseOptions(options, {}, interceptorMetadata))

  delete = (
    endpoint: string,
    query: any = {},
    interceptorMetadata?: InterceptorMetadata
  ): Observable<any> =>
    this._http.delete(this._getUrl(endpoint), this._parseOptions({}, query, interceptorMetadata))

  private _getUrl = (endpoint: string): string => this._apiUrl + endpoint;

  private _parseParams = (params: any): any =>
    Object.keys(params).reduce((acc: any, key: string): void =>
      (params[key] === null ? acc : {...acc, [key]: params[key]}), {})

  private _parseOptions = (options: any = {}, query: any = {}, interceptorMetadata?: InterceptorMetadata): any => {
    return {
      ...options,
      params: new InterceptorHttpParams({
        ...interceptorMetadata
      }, {
        ...this._parseParams(query)
      })
    };
  }
}
