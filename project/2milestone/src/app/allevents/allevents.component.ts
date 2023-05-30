import { Component, OnInit } from '@angular/core';
import { EventServiceService } from '../services/event/event-service.service';
import {eventPlace} from "../models/event";

@Component({
  selector: 'app-allevents',
  templateUrl: './allevents.component.html',
  styleUrls: ['./allevents.component.css']
})
export class AlleventsComponent implements OnInit{

  listOfEvents: eventPlace[] = [];

  constructor(private eventService: EventServiceService){}
  ngOnInit(): void {
    this.getAllEvents();
  }

  getAllEvents(){
    this.eventService.getAllEvents().subscribe({
      next: (data)=>{
this.listOfEvents = data;
      },
      error: err=>{

      },
      complete: () => {

      }
    })
  }

}
