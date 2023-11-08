import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { BaseService } from 'src/app/service/base.service';
import { ConfigService } from 'src/app/service/config.service';

interface MyEvents {
  date?: string;
  dateFormatted?: string;
}

@Component({
  selector: 'app-self-improve',
  templateUrl: './self-improve.component.html',
  styleUrls: ['./self-improve.component.css']
})
export class SelfImproveComponent {
  selfImprovementEvents: any[] = [];

  constructor(private base: BaseService, private config: ConfigService) {

    this.base.getSelfImprovementData().snapshotChanges().pipe(
      map((changes) =>
        changes.map((c) => {
          const eventData: MyEvents | null = c.payload.val() as MyEvents;
          if (eventData) {
            const eventDate = eventData.date ? new Date(eventData.date) : null;
            eventData.dateFormatted = eventDate ? this.formatDate(eventDate) : '';
          }
          return { key: c.payload.key, ...eventData };
        })
      )
    ).subscribe(adatok => {
      this.selfImprovementEvents = adatok;
    });


  }

  private formatDate(date: Date | null): string {
    if (date) {
      const options: Intl.DateTimeFormatOptions = {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      };
      
      return date.toLocaleDateString('hu-HU', options);
    }
    return '';
  }

}