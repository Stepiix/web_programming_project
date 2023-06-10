import { Component, OnInit } from '@angular/core';
import { eventPlace } from '../models/event';
import { CartService } from '../services/cart/cart.service';
import { AuthService } from './../services/auth/auth-service.service';

@Component({
  selector: 'app-mycart',
  templateUrl: './mycart.component.html',
  styleUrls: ['./mycart.component.css']
})
export class MycartComponent implements OnInit {
  cart: eventPlace[] = [];

  constructor(private cartService: CartService, private authService: AuthService) {}

  ngOnInit(): void {
    this.authService.getInfo().subscribe(currentUser => {
      if (currentUser) {
        const userId = currentUser._id;
        // this.cart = this.cartService.getCart(userId); // Retrieve the cart from the CartService
      }
    });
  }
}
