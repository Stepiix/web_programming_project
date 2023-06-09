import { AuthService } from './../services/auth/auth-service.service';
import { Component, OnInit } from '@angular/core';
import { PlaceService } from '../services/event/place.service';
import { EventServiceService } from '../services/event/event-service.service';
import { place } from '../models/place';
import { eventPlace } from "../models/event";
import { CartService } from '../services/cart/cart.service';
import { Router } from '@angular/router';
import { user } from '../models/user';

@Component({
  selector: 'app-allevents',
  templateUrl: './allevents.component.html',
  styleUrls: ['./allevents.component.css']
})
export class AlleventsComponent implements OnInit{
  userInfo: user = {
    _id: '',
    name: '',
    email: '',
    phonenumber: '',
    password: '',
    points: 0,
    role: 'USER'
  };
  listOfPlaces: place[] = [];
  listOfEvents: eventPlace[] = [];
  filteredEvents: eventPlace[] = []; // New property for filtered events
  isSortedAlphabetically: boolean = false; // New property to track sorting state
  isFilteredEarlier: boolean = false;
  prize: number=10;


  

  constructor(private eventService: EventServiceService, private placeService: PlaceService, private cartService: CartService, private router: Router, private auth: AuthService){
    this.isSortedAlphabetically = false; 
  }
  ngOnInit(): void {
    this.getAllPlaces();
    this.getAllEvents();
    this.filterEventsAlphabetically();
    this.getInfo();
    this.points();
  }

  points(): void{
    if(this.prize <= 1){
      this.prize = 1;
    }
    
  }
  getInfo(): void {
    this.auth.getInfo().subscribe({
      next: (data: user) => {
        this.userInfo = data;
        this.prize = this.prize - data.points;
        if(this.prize < 1){
          this.prize = 1;
        }
      },
      error: (err: any) => { }
    });
  }

  purchaseEvent(event: eventPlace): void {
    this.cartService.saveSale(event._id);
    this.router.navigate(['mycart']);
  }

  currentUserExists(): boolean {
    return localStorage.getItem('currentUser') == null;
  }

  getAllPlaces(){
    this.placeService.getAllPlaces().subscribe({
      next: (data)=>{
        this.listOfPlaces = data;
      },
      error: err=>{

      }
    })
  }
  
  // ...

  sortByNameAndPlace(): void {
    this.filteredEvents.sort((a, b) => {
      const placeComparison = a.place_id.localeCompare(b.place_id);
      if (placeComparison === 0) {
        return a.name.localeCompare(b.name);
      } else {
        return placeComparison;
      }
    });
  }

  sortReverseByNameAndPlace(): void {
    this.filteredEvents.sort((a, b) => {
      const placeComparison = b.place_id.localeCompare(a.place_id);
      if (placeComparison === 0) {
        return a.name.localeCompare(b.name);
      } else {
        return placeComparison;
      }
    });
  }

// ...
// ...

  sortByDateYoungestFirst(): void {
    this.filteredEvents.sort((a, b) => {
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);
      return dateB.getTime() - dateA.getTime();
    });
  }

  sortByDateOldestFirst(): void {
    this.filteredEvents.sort((a, b) => {
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);
      return dateA.getTime() - dateB.getTime();
    });
  }

  getAllEvents() {
    this.eventService.getAllEvents().subscribe({
      next: (data) => {
        this.listOfEvents = data;
  
        for (let i = 0; this.listOfEvents[i] != null; i++) {
          this.listOfEvents[i].date = this.listOfEvents[i].date.split("T", 2)[0];
  
          for (let j = 0; this.listOfPlaces[j] != null; j++) {
            if (this.listOfEvents[i].place_id == this.listOfPlaces[j]._id) {
              this.listOfEvents[i].place_id = this.listOfPlaces[j].name;
            }
          }
        }
  
        this.filterEvents(); // Filter and sort the events
      },
      error: (err) => {},
      complete: () => {}
    });
  }

  sortAlphabetically(): void {
    this.isSortedAlphabetically = true;
    this.filterEvents();
  }

  sortReverse(): void {
    this.isSortedAlphabetically = false;
    this.filterEvents();
  }
  
  filterEventsAlphabetically(): void {
    this.listOfEvents.sort((a, b) => {
      return a.name.localeCompare(b.name); // Sort the events by name using localeCompare
    });
  }
  
  filterEvents(): void {
    const currentDate = new Date();
  
    // Sort the events alphabetically or in reverse based on the sorting flag
    if (this.isSortedAlphabetically) {
      this.listOfEvents.sort((a, b) => {
        return a.name.localeCompare(b.name);
      });
    } else {
      this.listOfEvents.sort((a, b) => {
        return b.name.localeCompare(a.name);
      });
    }
  
    // Filter the events based on the date and sorting conditions
    if (this.isFilteredEarlier) {
      this.filteredEvents = this.listOfEvents.filter(event => {
        const eventDate = new Date(event.date);
        return eventDate < currentDate;
      });
    } else {
      this.filteredEvents = this.listOfEvents.filter(event => {
        const eventDate = new Date(event.date);
        return eventDate >= currentDate;
      });
    }
  }
  
  
  onSortButtonClick(): void {
    this.isSortedAlphabetically = !this.isSortedAlphabetically;
    this.filterEvents();
  }
  

}
