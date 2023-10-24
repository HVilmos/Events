import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  eventList=[
    "imgUrl", "name","description", "price" , "date"
  ]
  constructor() { }

  getEventsData(){
    return this.eventList
  }}
