import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { BaseService } from 'src/app/service/base.service';
import { ConfigService } from 'src/app/service/config.service';
interface MyEvents {
  date?: string;
  dateFormatted?: string;
}

@Component({
  selector: 'app-sport',
  templateUrl: './sport.component.html',
  styleUrls: ['./sport.component.css']
})
export class SportComponent {
  sportsAndHealthEvents: any[] = [];

  constructor(private base: BaseService, private config: ConfigService, private router: Router) {

    this.base.getSportsAndHealthData().snapshotChanges().pipe(
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
      this.sportsAndHealthEvents = adatok;
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

  onViewDetailsClick(eventId: string, eventType: string) {
    // Az átirányítás a 'event/:type/:id' útvonalra, ahol a type a típus, az id pedig az azonosító
    this.router.navigate(['/event', eventType, eventId]);
  }

}
