import { Injectable } from '@angular/core';
import { eventPlace } from '../../models/event';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private carts: { [userId: string]: eventPlace[] } = {};

  addToCart(userId: string, event: eventPlace): void {
    if (!this.carts[userId]) {
      this.carts[userId] = [];
    }
    this.carts[userId].push(event);
  }

  getCart(userId: string): eventPlace[] {
    return this.carts[userId] || [];
  }
}