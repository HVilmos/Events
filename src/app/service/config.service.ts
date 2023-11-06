import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  eventList=[
    "imgUrl", "name","description", "price" , "date", "location"
  ]
  constructor() { }

  getEventsData(){
    return this.eventList
  }}
