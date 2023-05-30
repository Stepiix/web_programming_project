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

  // return this.http.post<event[]>(endpoint, {info to send to the backend in json}, options);
}
