import { Component, OnInit } from '@angular/core';
import { CartService } from '../services/cart/cart.service';
import { Sale } from '../models/sale';
import { place } from '../models/place';
import { eventPlace } from '../models/event';
import { EventServiceService } from '../services/event/event-service.service';

@Component({
  selector: 'app-mycart',
  templateUrl: './mycart.component.html',
  styleUrls: ['./mycart.component.css']
})
export class MycartComponent implements OnInit {
  cart: Sale[] = [];
  listOfEvents: eventPlace[] = [];

  constructor(private cartService: CartService, private eventService: EventServiceService) {}

  ngOnInit(): void {
    this.cartService.getCart().subscribe(sales => {
      if (sales)
        this.cart = sales;
    });
    this.getAllEvents();
  }

  getAllEvents() {
    this.eventService.getBoughtEvents().subscribe({
      next: (data) => {
        this.listOfEvents = data;
  
        for (let i = 0; this.listOfEvents[i] != null; i++) {
          this.listOfEvents[i].date = this.listOfEvents[i].date.split("T", 2)[0];
        }
      },
      error: (err) => {},
      complete: () => {}
    });
  }
}
