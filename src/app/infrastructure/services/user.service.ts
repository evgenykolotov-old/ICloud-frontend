import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { environment } from '../../../environments/environment';
import {User, ResponseData } from '../types/types';
import { UrlHelper } from '../helpers/UrlHelper';
import { map, tap } from 'rxjs/operators';

const REGISTRATION_API_PATH = UrlHelper.combineFragments(environment.apiPrefix, 'auth', 'registration');
const AUTHORIZATION_API_PATH = UrlHelper.combineFragments(environment.apiPrefix, 'auth', 'login');

@Injectable({ providedIn: 'root' })
export class UserService {
  constructor(
    private httpClient: HttpClient,
  ) { }

  public registration(data: Partial<User>): Observable<ResponseData> {
    return this.httpClient.post<ResponseData>(REGISTRATION_API_PATH, data);
  }

  public authorization(data: Partial<User>): Observable<ResponseData> {
    return this.httpClient.post<ResponseData>(AUTHORIZATION_API_PATH, data);
  }
}
