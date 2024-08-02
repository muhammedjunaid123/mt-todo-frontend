import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { user } from '../../../types/user.interface';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private _http: HttpClient) { }

  userRegister(data: user) {
    return this._http.post('/user/register', data)
  }
  userLogin(data: user) {
    return this._http.post('/user/login', data)
  }
}
