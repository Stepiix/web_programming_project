import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { place } from "../../models/place";

const endpoint = "http://localhost:3000/places/";
const options = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class PlaceService {

  constructor(private http: HttpClient) { }

  getAllPlaces(): Observable<place[]> {
    return this.http.get<place[]>(endpoint + "showAll");
  }

  // return this.http.post<event[]>(endpoint, {info to send to the backend in json}, options);
}
