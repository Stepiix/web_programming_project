import { Component, OnInit } from '@angular/core';
import { CartService } from '../services/cart/cart.service';
import { Sale } from '../models/sale';
import { eventPlace } from '../models/event'; // Fix import statement
import { EventServiceService } from '../services/event/event-service.service';

@Component({
  selector: 'app-mycart',
  templateUrl: './mycart.component.html',
  styleUrls: ['./mycart.component.css']
})
export class MycartComponent implements OnInit {
  cart: Sale[] = [];
  listOfEvents: eventPlace[] = []; // Correct model name

  constructor(private cartService: CartService, private eventService: EventServiceService) {}

  ngOnInit(): void {
    this.cartService.getCart().subscribe(sales => {
      if (sales) {
        this.cart = sales;
        this.retrieveEventPlaces(); // Fetch eventPlace data
      }
    });
  }

  retrieveEventPlaces(): void {
    const eventIds = this.cart.map(sale => sale.event_id);
    this.eventService.getEventPlaces(eventIds).subscribe(eventPlaces => {
      if (eventPlaces) {
        this.listOfEvents = eventPlaces;
      }
    });
  }
  
}
