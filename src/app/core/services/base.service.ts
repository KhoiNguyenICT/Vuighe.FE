import { Injectable, Injector } from '@angular/core'
import { HttpClient, HttpParams } from '@angular/common/http'
import { ApiConfig } from './api-config'
import { IHttpClientRequestOptions } from 'types';

@Injectable({
  providedIn: 'root'
})
export class BaseService {
  protected httpClient = this.injector.get(HttpClient)
  protected baseUrl = this.injector.get(ApiConfig).apiRoot

  constructor(protected injector: Injector) { }

  setBaseUrl(url: string) {
    if (url.match(/^https?:\/\//)) {
      this.baseUrl = url
      return
    }

    this.baseUrl = this.injector.get(ApiConfig).apiRoot + url
  }

  protected createUrl(url: string) {
    if (!url.startsWith('/')) {
      url = '/' + url
    }
    return this.baseUrl + url
  }

  protected createParams(params: {
    [key: string]: any
  }): HttpParams {
    return Object.keys(params).reduce((m, k) => {
      if (params[k]) {
        return m.set(k, params[k].toString())
      }
      return m
    }, new HttpParams())
  }

  protected get(url: string, params?) {
    url = this.createUrl(url)
    params = params ? this.createParams(params) : undefined
    return this.httpClient.get(url, { params: params })
  }

  protected post(url: string, params?: any, body?: any) {
    url = this.createUrl(url)
    params = params ? this.createParams(params) : undefined
    return this.httpClient.post(url, body, { params: params })
  }

  protected put(url: string, params?: any, body?: any) {
    url = this.createUrl(url)
    params = params ? this.createParams(params) : undefined
    return this.httpClient.put(url, body, { params: params })
  }

  protected delete(url: string, params?: any, body?: any) {
    url = this.createUrl(url)
    params = params ? this.createParams(params) : undefined
    return this.httpClient.delete(url, { params: params })
  }

  protected request(method: string, url: string, params?: any, options?: IHttpClientRequestOptions) {
    url = this.createUrl(url)
    params = params ? this.createParams(params) : undefined
    options.params = params
    return this.httpClient.request(method, url, options)
  }
}
