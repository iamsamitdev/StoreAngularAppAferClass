import { Injectable } from '@angular/core'
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { ConstantService } from './constant.service';
import { Observable } from 'rxjs';
import { UserModel } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  // Headers
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    })
  }

  constructor(private http: HttpClient, private constant: ConstantService) { }

  // Method สำหรับการเช็ค Login
  LogIn(data: any): Observable<UserModel>{
    return this.http.post<UserModel>(this.constant.baseAPIURL+ 'Authenticate/login', JSON.stringify(data), this.httpOptions)
  }

  // Method สำหรับการ Register
  Register(data: any): Observable<UserModel>{
    return this.http.post<UserModel>(this.constant.baseAPIURL+ 'Authenticate/register', JSON.stringify(data), this.httpOptions)
  }

}
