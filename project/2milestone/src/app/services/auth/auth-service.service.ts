import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError } from 'rxjs';
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
    return this.http.post<AuthResponse>(endpoint+"login", {e: email, pw: password}, options)
    .pipe(catchError((error) => {
      throw error;
    }));
  }

  register(username: string, e: string, pw: string, pn: string) {
    return this.http.post<any>(endpoint+"register", {name: username, email: e, password: pw, phonenumber: pn}, options)
      .pipe(catchError((error) => {
        throw error;
      }));
  }

  getInfo(): Observable<user> {
    let currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}').token;
    return this.http.get<user>(endpoint+"user-info-endpoint", {headers: new HttpHeaders({'token': currentUser})})
  }

  logout() {
    localStorage.removeItem('currentUser');
  }
  
  isAdmin(email: string): Observable<AuthResponse> {
    return this.http.get<AuthResponse>(endpoint+"is-admin", {headers: new HttpHeaders({'mail': email})});
  }
}

export interface AuthResponse{ }