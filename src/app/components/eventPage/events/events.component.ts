import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { BaseService } from 'src/app/service/base.service';

interface MyEvents {
  date?: string;
  dateFormatted?: string;
  category?: string;
  imgUrl?: string;
  name?: string;
  description?: string;
  place?: string;
  price?: number;
  key?: string;
}

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css']
})
export class EventsComponent implements OnInit {

  allEvents: MyEvents[] = [];
  events: MyEvents[] = [];
  selectedEventCategory: string | null = null;

  priceFilter = new FormControl(0);
  sortByFilter = new FormControl('Default');
  locationFilter = new FormControl('Any');

  constructor(private base: BaseService, private router: Router) {
    this.base.getData()
      .snapshotChanges()
      .pipe(
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
      )
      .subscribe((adatok) => {
        this.allEvents = adatok.map((eventData) => {
          const eventDate = eventData.date ? new Date(eventData.date) : null;
          eventData.dateFormatted = eventDate ? this.formatDate(eventDate) : '';
          return { ...eventData, key: eventData.key } as MyEvents;
        });
        this.applyFilters();
      });
  }

  ngOnInit() {
    this.priceFilter.valueChanges.subscribe(() => this.applyFilters());
    this.sortByFilter.valueChanges.subscribe(() => this.applyFilters());
    this.locationFilter.valueChanges.subscribe(() => this.applyFilters());
  }

  private filterEventsByCategory() {
    if (!this.selectedEventCategory) {
      this.events = [...this.allEvents];
    } else {
      this.events = this.allEvents.filter((event) => event.category === this.selectedEventCategory && event.key !== undefined);
    }
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

  private priceFilterCondition(event: MyEvents): boolean {
    const selectedPrice = this.priceFilter.value;
    return (
      selectedPrice === 0 ||
      (selectedPrice === 1 && event.price === 0) ||
      (selectedPrice === 2 && (event.price || 0) < 3000) ||
      (selectedPrice === 3 && (event.price || 0) >= 3000 && (event.price || 0) <= 10000) ||
      (selectedPrice === 4 && (event.price || 0) > 10000)
    );
  }

  private sortByFilterCondition(event: MyEvents): boolean {
    // Implement your sorting logic here
    return true;
  }

  private locationFilterCondition(event: MyEvents): boolean {
    const selectedLocation = this.locationFilter.value;
    return (
      selectedLocation === 'Any' ||
      (selectedLocation === 'Budapest' && event.place === 'Budapest') ||
      (selectedLocation === 'Online' && event.place === 'Online') ||
      (selectedLocation === 'Other' && event.place !== 'Budapest' && event.place !== 'Online')
    );
  }

  applyFilters() {
    // Clone the original array to avoid modifying the original data
    this.events = [...this.allEvents];

    // Ár szűrő
    this.events = this.events.filter((event) => this.priceFilterCondition(event));

    // Ár szerinti rendezés
    if (this.sortByFilter.value === 'PriceLowToHigh') {
      this.events.sort((a, b) => (a.price || 0) - (b.price || 0));
    } else if (this.sortByFilter.value === 'PriceHighToLow') {
      this.events.sort((a, b) => (b.price || 0) - (a.price || 0));
    }

    // Helyszín szűrő
    this.events = this.events.filter((event) => this.locationFilterCondition(event));

    // Kategória szűrő
    this.filterEventsByCategory();
  }

  onCategoryClick(category: string) {
    this.selectedEventCategory = this.selectedEventCategory === category ? null : category;
    this.applyFilters();
  }

  onViewDetailsClick(eventId: string, eventType: string) {
    this.router.navigate(['/event', eventType, eventId]);
  }
}
