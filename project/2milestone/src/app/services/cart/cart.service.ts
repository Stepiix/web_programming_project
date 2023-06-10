import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError } from 'rxjs';
import { eventPlace } from '../../models/event';


const endpoint = "http://localhost:3000/items/";
const options = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};


@Injectable({
  providedIn: 'root'
})
export class CartService {
  
  constructor(private http: HttpClient) { }

  saveSale(userId: String, eventId: String) {
    return this.http.post<any>(endpoint+"saveSale", {userId: userId, eventId: eventId}, options);
  }


  // addToCart(userId: string, event: eventPlace): void {
  //   if (!this.carts[userId]) {
  //     this.carts[userId] = [];
  //   }
  //   this.carts[userId].push(event);
  // }

  // getCart(userId: string): eventPlace[] {
  //   return this.carts[userId] || [];
  // }
}