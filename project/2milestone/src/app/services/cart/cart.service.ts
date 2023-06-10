import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError } from 'rxjs';
import { Sale } from 'src/app/models/sale';
import { user } from 'src/app/models/user';


const endpoint = "http://localhost:3000/sales/";
const options = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};


@Injectable({
  providedIn: 'root'
})
export class CartService {
  
  constructor(private http: HttpClient) { }

  saveSale(eventId: string) {
    let currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}').token;
    alert(eventId+ "   " + currentUser)
    this.http.post(endpoint+"save",null, {headers: new HttpHeaders({'token': currentUser, 'event_id': eventId})}).subscribe(
      () => { },
      (error) => { }
    );
    alert("dopo")
  }

  getCart(): Observable<Sale[]> {
    let currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}').token;
    return this.http.get<Sale[]>(endpoint+"cart", {headers: new HttpHeaders({'token': currentUser})});
  }
}