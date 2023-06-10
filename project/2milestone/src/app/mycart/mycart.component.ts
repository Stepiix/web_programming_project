import { Component, OnInit } from '@angular/core';
import { CartService } from '../services/cart/cart.service';
import { AuthService } from './../services/auth/auth-service.service';
import { Sale } from '../models/sale';

@Component({
  selector: 'app-mycart',
  templateUrl: './mycart.component.html',
  styleUrls: ['./mycart.component.css']
})
export class MycartComponent implements OnInit {
  cart: Sale[] = [];

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.cartService.getCart().subscribe(sales => {
      if (sales)
        this.cart = sales;
    });
  }
}
