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

  constructor(private route: ActivatedRoute, private base: BaseService) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const eventId = params['id'];
  
      console.log('Event ID:', eventId);
  
      this.base.getEventById(eventId).valueChanges().subscribe(event => {
        console.log('Event Data:', event);
        this.event = event;
      });
    });
  }

 
  
}

