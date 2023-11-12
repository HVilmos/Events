import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route } from '@angular/router';
import { BaseService } from 'src/app/service/base.service';

@Component({
  selector: 'app-event-details',
  templateUrl: './event-details.component.html',
  styleUrls: ['./event-details.component.css']
})
export class EventDetailsComponent implements OnInit {
  event: any;
  eventType!: string; // Új változó az esemény típusának tárolására

  constructor(private route: ActivatedRoute, private base: BaseService) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.eventType = params['type']; // Az új paraméter a típust tárolja
      const eventId = params['id'];  
      this.base.getEventById(eventId, this.eventType).valueChanges().subscribe(event => {
        console.log('Event Data:', event);
        this.event = event;
      });
    });
  }
}
