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
  events: any;
  sortedEvents: any; 
  searchText: string = '';
  selectedSortOption: string = 'default'; 

  constructor(private base: BaseService, private config: ConfigService) {
    this.base.getData().snapshotChanges().pipe(
      map((changes) =>
        changes.map((c) => ({ key: c.payload.key, ...c.payload.val() }))
      )
    ).subscribe(adatok => {
      this.events = adatok;
      this.sortEvents(); 
    });
  }

  sortEvents() {
    switch (this.selectedSortOption) {
      case 'dateAsc':
        this.sortedEvents = this.events.slice().sort((a:any, b:any) => {
          if (a.date && b.date) {
            const dateA = new Date(a.date);
            const dateB = new Date(b.date);
            return dateA.getTime() - dateB.getTime();
          }
          return 0;
        });
        break;
      case 'dateDesc':
        this.sortedEvents = this.events.slice().sort((a:any, b:any) => {
          if (a.date && b.date) {
            const dateA = new Date(a.date);
            const dateB = new Date(b.date);
            return dateB.getTime() - dateA.getTime();
          }
          return 0;
        });
        break;
      case 'priceAsc':
        this.sortedEvents = this.events.slice().sort((a:any, b:any) => a.price - b.price);
        break;
      case 'priceDesc':
        this.sortedEvents = this.events.slice().sort((a:any, b:any) => b.price - a.price);
        break;
      default:
        this.sortedEvents = this.events;
        break;
    }
  }

  filterEvents() {
    if (this.searchText) {
      this.sortedEvents = this.events.filter((event: any) => {
        return event.name.toLowerCase().includes(this.searchText.toLowerCase()) ||
               event.description.toLowerCase().includes(this.searchText.toLowerCase());
      });
    } else {
      this.sortEvents();
    }
  }

  calculateRemainingDays(eventDate: string): number {
    const currentDate = new Date();
    const targetDate = new Date(eventDate);
    const timeDifference = targetDate.getTime() - currentDate.getTime();
    const daysRemaining = Math.floor(timeDifference / (1000 * 3600 * 24));
    return daysRemaining;
  }
}
