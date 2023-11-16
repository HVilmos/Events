import { Component } from '@angular/core';
import { map } from 'rxjs/operators';
import { BaseService } from 'src/app/service/base.service';
import { ConfigService } from 'src/app/service/config.service';
import { Router } from '@angular/router';
import { BookMarkService } from 'src/app/service/book-mark.service';
interface MyEvent {
  date?: string;
  dateFormatted?: string;
}

@Component({
  selector: 'app-featured',
  templateUrl: './featured.component.html',
  styleUrls: ['./featured.component.css']
})
export class FeaturedComponent {
  featuredEvents: any;

  constructor(private base: BaseService, private config: ConfigService, private router: Router, private bookmark: BookMarkService) {
    this.base.getFeaturedData().snapshotChanges().pipe(
      map((changes) =>
        changes.map((c) => {
          const eventData: MyEvent | null = c.payload.val() as MyEvent;
          if (eventData) {
            const eventDate = eventData.date ? new Date(eventData.date) : null;
            eventData.dateFormatted = eventDate ? this.formatDate(eventDate) : '';
          }
          return { key: c.payload.key, ...eventData };
        })
      )
    ).subscribe(adatok => {
      this.featuredEvents = adatok;
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

<<<<<<< HEAD
  onViewDetailsClick(eventId: string, eventType: string) {
=======
  onViewDetailsClick(eventId: string, eventType: string,) {
>>>>>>> ed0eb0cc9545ec91a1e680b4c2a65f8f0a29ee89
    this.router.navigate(['/event', eventType, eventId]);
  }
  
  addToBookmarks(event: any) {
    this.bookmark.addToBookmarks(event);
  }
}
