import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { user } from '../../models/user';


const endpoint = "http://localhost:3000/users/";
const options = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  constructor(private http: HttpClient) { }

  login(email: string, password:string): Observable<AuthResponse>{
    return this.http.post<AuthResponse>(endpoint+"login", {e: email, pw: password}, options);
  }

  register(username: string, e: string, pw: string, pn: string) {
    return this.http.post<any>(endpoint+"register", {name: username, email: e, password: pw, phonenumber: pn}, options);
  }


  getInfo(): Observable<user> {
    // return this.http.get<user>(endpoint+"user-info-endpoint");
    let currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
    return this.http.get<user>(endpoint+"user-info-endpoint", {headers: new HttpHeaders({'token': currentUser})});
  }
  // getInfo() : any{
  //   let local = localStorage.getItem('currentUser')
  //   if(local != null)
  //     return this.http.get<user>(endpoint + "get", { headers: new HttpHeaders({'x-acces-token': JSON.parse(local).token}) });
  //   return { 
  //     _id: '',
  //     name: '',
  //     email: '',
  //     phonenumber: '',
  //     password: ''
  //   };
  // }

  logout() {
    localStorage.removeItem('currentUser');
  }
}

export interface AuthResponse{ }