import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  constructor(private _http: HttpClient) { }
    todoCreate(data: any) {
   return this._http.post('/todo/create', data)
  }
  todoUpdate(data:any){
return this._http.patch('/todo/update',data)
  }
}
