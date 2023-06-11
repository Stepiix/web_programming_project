import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { eventPlace } from "./../../models/event";

const endpoint = "http://localhost:3000/items/";
const options = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class EventServiceService {

  constructor(private http: HttpClient) { }

  getAllEvents(): Observable<eventPlace[]> {
    return this.http.get<eventPlace[]>(endpoint + "showAll");
  }

  getBoughtEvents(): Observable<eventPlace[]> {
    let currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}').token;
    return this.http.get<eventPlace[]>(endpoint + "showSale", {headers: new HttpHeaders({'token': currentUser})});
  }
  getEventPlaces(eventIds: string[]): Observable<eventPlace[]> {
    return this.http.post<eventPlace[]>(endpoint + "getEventPlaces", { eventIds }, options);
  }

  // return this.http.post<event[]>(endpoint, {info to send to the backend in json}, options);
}
