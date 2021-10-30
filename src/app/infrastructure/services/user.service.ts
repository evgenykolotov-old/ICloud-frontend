import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import {User, ResponseData } from '../types/types';
import { UrlHelper } from '../helpers/UrlHelper';

const REGISTRATION_API_PATH = UrlHelper.combineFragments(environment.apiPrefix, 'auth', 'registration');
const LOGIN_API_PATH = UrlHelper.combineFragments(environment.apiPrefix, 'auth', 'login');
const AUTHORIZATION_API_PATH = UrlHelper.combineFragments(`${environment.apiPrefix}`, 'auth', 'auth');

@Injectable({ providedIn: 'root' })
export class UserService {
  constructor(
    private httpClient: HttpClient,
  ) { }

  public registration(data: Partial<User>): Observable<ResponseData> {
    return this.httpClient.post<ResponseData>(REGISTRATION_API_PATH, data);
  }

  public login(data: Partial<User>): Observable<ResponseData> {
    return this.httpClient.post<ResponseData>(LOGIN_API_PATH, data);
  }

  public authorization(token: string): Observable<ResponseData> {
    const headers = new HttpHeaders().set('authorization', `Bearer ${token}`);

    return this.httpClient.post<ResponseData>(AUTHORIZATION_API_PATH, null, { headers });
  }
}
