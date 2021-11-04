import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { UrlHelper } from '../helpers/UrlHelper';
import { CreateFileRequest, ResponseData } from '../types/types';

const GET_FILES_API_PATH = UrlHelper.combineFragments(environment.apiPrefix, 'file');
const CREATE_DIR_API_PATH = UrlHelper.combineFragments(environment.apiPrefix, 'file');

@Injectable({ providedIn: 'root' })
export class FileService {
  constructor(
    private readonly httpClient: HttpClient,
  ) { }

  public getFiles(parentId: string): Observable<ResponseData> {
		const params = new HttpParams();
		const token = window.localStorage.getItem('token');

		return this.httpClient.get<ResponseData>(GET_FILES_API_PATH, { 
			headers: new HttpHeaders().set('authorization', `Bearer ${token}`),
			params: parentId ? params.set('parent', parentId) : params,
		});
	}

	public createDir(directoryData: CreateFileRequest): Observable<ResponseData> {
		const token = window.localStorage.getItem('token');

		return this.httpClient.post<ResponseData>(CREATE_DIR_API_PATH, directoryData, {
			headers: new HttpHeaders().set('authorization', `Bearer ${token}`),
		});
	}
}
