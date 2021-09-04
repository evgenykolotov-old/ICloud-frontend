import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import {AuthorizationData, RegistrationData } from '../types/types';

@Injectable({ providedIn: 'root' })
export class UserService {
  constructor(
    private httpClient: HttpClient,
  ) { }

  public registration(data: RegistrationData): Observable<any> {
    return this.httpClient.post<any>(`${environment.apiPrefix}auth/registration`, data);
  }

  public authorization(data: AuthorizationData): Observable<any> {
    return this.httpClient.post<any>(`${environment.apiPrefix}auth/authorization`, data);
  }
}
