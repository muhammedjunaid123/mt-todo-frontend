import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { user } from '../../../types/user.interface';
import { Observable } from 'rxjs';
import { IApiResponse } from '../../../types/api.interface';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private _http: HttpClient) { }

  userRegister(data: user): Observable<IApiResponse<any>> {
    return this._http.post<IApiResponse<any>>('/user/register', data)
  }
  userLogin(data: user): Observable<IApiResponse<string>> {
    return this._http.post<IApiResponse<string>>('/user/login', data)
  }
}
