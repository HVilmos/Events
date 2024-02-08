import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { BaseService } from 'src/app/service/base.service';
import { Router } from '@angular/router';

interface MyEvent {
  date?: string;
  dateFormatted?: string;
  category?: string;
}

@Component({
  selector: 'app-featured',
  templateUrl: './featured.component.html',
  styleUrls: ['./featured.component.css']
})
export class FeaturedComponent implements OnInit {
  ngOnInit(): void {}

  featuredEvents: any;

  constructor(
    private base: BaseService,
    private router: Router,
  ) {
    this.base.getData()
      .snapshotChanges()
      .pipe(
        map((changes) =>
          changes.map((c) => {
            const eventData: MyEvent | null = c.payload.val() as MyEvent;
            if (eventData && eventData.category === 'featured') {
              const eventDate = eventData.date ? new Date(eventData.date) : null;
              eventData.dateFormatted = eventDate ? this.formatDate(eventDate) : '';
              return { key: c.payload.key, ...eventData };
            } else {
              return null; 
            }
          })
        )
      )
      .subscribe((adatok) => {
        this.featuredEvents = adatok.filter((event) => event !== null);
      });
  }

  private formatDate(date: Date | null): string {
    if (date) {
      const options: Intl.DateTimeFormatOptions = {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      };

      return date.toLocaleDateString('hu-HU', options);
    }
    return '';
  }

  onViewDetailsClick(eventId: string, eventType: string) {
    this.router.navigate(['/event', eventType, eventId]);
  }
}
