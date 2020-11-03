import { HttpParams } from '@angular/common/http';

export interface InterceptorMetadata {
  modal?: boolean;
  disableLoadingIndicator?: boolean;
}

export class InterceptorHttpParams extends HttpParams {
  constructor(public interceptorMetadata: InterceptorMetadata, params?: { [param: string]: string | string[] }) {
    super({ fromObject: params });
  }
}
