import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError } from 'rxjs';
import { Sale } from 'src/app/models/sale';


const endpoint = "http://localhost:3000/sales/";
const options = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};


@Injectable({
  providedIn: 'root'
})
export class CartService {
  
  constructor(private http: HttpClient) { }

  saveSale(userId: String, eventId: String) {
    this.http.post(endpoint+"saveSale", {customer_id: userId, event_id: eventId}, options);
  }

  getCart(): Observable<Sale[]> {
    let currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}').token;
    return this.http.get<Sale[]>(endpoint+"cart", {headers: new HttpHeaders({'token': currentUser})});
  }
}