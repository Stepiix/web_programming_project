import { RegisterComponent } from './../../register/register.component';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from "./../../models/user";

const endpoint = "http://localhost:3000/users/";
const options = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

interface RegisterResponse {
  success: boolean
}

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  constructor(private http: HttpClient) { }

  createUser(user: User): Observable<any> {
    return this.http.post<any>(endpoint + "create2", user, options);
  }

  registerUser(username: any, password: any) {
    return this.http.post<RegisterResponse>('http://localhost:3000/users/', {
      username,
      password
    })
  }

}
