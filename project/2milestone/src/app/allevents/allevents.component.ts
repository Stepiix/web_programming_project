import { Component, OnInit } from '@angular/core';
import { PlaceService } from '../services/event/place.service';
import { EventServiceService } from '../services/event/event-service.service';
import { place } from '../models/place';
import { eventPlace } from "../models/event";

@Component({
  selector: 'app-allevents',
  templateUrl: './allevents.component.html',
  styleUrls: ['./allevents.component.css']
})
export class AlleventsComponent implements OnInit{
  listOfPlaces: place[] = [];
  listOfEvents: eventPlace[] = [];

  constructor(private eventService: EventServiceService, private placeService: PlaceService){}
  ngOnInit(): void {
    this.getAllPlaces();
    this.getAllEvents();
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

  getAllEvents(){
    this.eventService.getAllEvents().subscribe({
      next: (data)=>{
        this.listOfEvents = data;

        for (let i=0; this.listOfEvents[i]!= null; i++) {
          this.listOfEvents[i].date = this.listOfEvents[i].date.split("T", 2)[0]

          for (let j=0; this.listOfPlaces[j]!= null; j++) {
            if (this.listOfEvents[i].place_id == this.listOfPlaces[j]._id){
              this.listOfEvents[i].place_id = this.listOfPlaces[j].name
            }
          }
        }
      },
      error: err=>{

      },
      complete: () => {

      }
    })
  }

}
