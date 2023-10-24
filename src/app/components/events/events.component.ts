import { Component } from '@angular/core';
import { map } from 'rxjs';
import { BaseService } from 'src/app/service/base.service';
import { ConfigService } from 'src/app/service/config.service';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css']
})
export class EventsComponent {
  events:any

  constructor(private base:BaseService, 
    private config:ConfigService){
    this.base.getData().snapshotChanges().pipe(
      map( (changes)=> changes.map(
        (c)=>({key:c.payload.key, ...c.payload.val()})
      ))
    ).subscribe(adatok=>this.events=adatok)
  
    this.events=this.config.getEventsData
  }

  calculateRemainingDays(eventDate: string): number {
    const currentDate = new Date();
    const targetDate = new Date(eventDate);
    const timeDifference = targetDate.getTime() - currentDate.getTime();
    const daysRemaining = Math.floor(timeDifference / (1000 * 3600 * 24));
    return daysRemaining;
  }
}
