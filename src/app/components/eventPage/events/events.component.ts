import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { BaseService } from 'src/app/service/base.service';
import { MyEvents } from 'src/app/model/event.model';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css']
})
export class EventsComponent implements OnInit {

  allEvents: MyEvents[] = [];
  filteredEvents: MyEvents[] = [];
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

  priceFilterCondition(event: MyEvents, selectedPriceOption: number): boolean {
    const eventPrice = event.price !== undefined ? event.price : 0;

    switch (selectedPriceOption) {
      case 0:
        return true;
      case 1:
        return eventPrice === 0;
      case 2:
        return eventPrice < 3000;
      case 3:
        return eventPrice >= 3000 && eventPrice <= 10000;
      case 4:
        return eventPrice > 10000;
      default:
        return true;
    }
  }

  filterEventsByCategory(events: MyEvents[]) {
    const selectedPriceOption = this.priceFilter.value || 0;

    if (!this.selectedEventCategory) {
      this.filteredEvents = events.filter((event) => this.priceFilterCondition(event, selectedPriceOption));
    } else {
      this.filteredEvents = events.filter((event) => event.category === this.selectedEventCategory && event.key !== undefined);
    }
  }

  applyFilters() {
    console.log('Applying filters...');

    this.filteredEvents = [...this.allEvents];

    const selectedPriceOption = this.priceFilter.value || 0;

    this.filteredEvents = this.filteredEvents.filter((event) => this.priceFilterCondition(event, selectedPriceOption));

    console.log('Filtered events:', this.filteredEvents);

    this.filterEventsByCategory(this.filteredEvents);
  }

  onCategoryClick(category: string) {
    this.selectedEventCategory = this.selectedEventCategory === category ? null : category;
    this.applyFilters();
  }

  onViewDetailsClick(eventId: string, eventType: string) {
    this.router.navigate(['/event', eventType, eventId]);
  }
}
