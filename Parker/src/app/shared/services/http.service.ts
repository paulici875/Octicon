import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const baseUrl = 'http://localhost:57629';

@Injectable()
export class HttpService {

  private httpClient: HttpClient;

  constructor(httpClient: HttpClient) {
    this.httpClient = httpClient;
  }

  public get(url: string, params?: any): Observable<any> {
    if (params !== undefined) {
      return this.httpClient.get(`${baseUrl}${url}`, {params});
    } else {
      return this.httpClient.get(`${baseUrl}${url}`, {});
    }
  }

  public post(url: string, data: any, params?: any): Observable<any> {
    return this.httpClient.post(`${baseUrl}${url}`, data, {
      params,
      headers: {
        // 'api': localStorage.getItem('userID') || ''
      }
    }
    );
  }

  public delete(url: string): Observable<any> {
    return this.httpClient.delete(`${baseUrl}${url}`, {
      headers: {
        // 'api': localStorage.getItem('userID') || ''
      }
    });
  }

  public put(url: string, data: any): Observable<any> {
    return this.httpClient.put(`${baseUrl}${url}`, data, {
      headers: {
        // 'api': localStorage.getItem('userID') || ''
      }
    });
  }
}
