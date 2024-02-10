import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
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
  events: MyEvents[] = [];
  selectedEventCategory: string | null = null;

  priceFilter = new FormControl('0');
  sortByFilter = new FormControl('Default');
  locationFilter = new FormControl('Any');
  searchFormControl = new FormControl();  

  constructor(private base: BaseService, private router: Router , private route: ActivatedRoute) {}

  ngOnInit() {
    this.base.getData().snapshotChanges().pipe(
      map(changes =>
        changes.map(c => ({ key: c.payload.key, ...c.payload.val() } as MyEvents))
      )
    ).subscribe(data => {
      this.allEvents = data;
      this.applyFilters();  
    });


    this.priceFilter.valueChanges.subscribe(() => this.applyFilters());
    this.sortByFilter.valueChanges.subscribe(() => this.applyFilters());
    this.locationFilter.valueChanges.subscribe(() => this.applyFilters());
    this.searchFormControl.valueChanges.subscribe(() => this.onSearchInputChange());
  }

  applyFilters() {
    this.filterEventsByCategory();
  }

  onSearchInputChange() {
    this.filterEventsBySearchTerm();
  }

  filterEventsBySearchTerm() {
    const searchTerm = this.searchFormControl.value?.toLowerCase() || '';
  
    this.events = this.allEvents.filter(
      event =>
        (event.name && event.name.toLowerCase().includes(searchTerm)) ||
        (event.description && event.description.toLowerCase().includes(searchTerm)) ||
        (event.place && event.place.toLowerCase().includes(searchTerm))
    );
  
    if (this.sortByFilter.value !== 'Default') {
      this.sortEvents();
    }
  }

  filterEventsByCategory() {
    const selectedPriceOption = this.priceFilter.value || '0';
    const selectedLocationOption = this.locationFilter.value || 'Any';

    if (!this.selectedEventCategory || this.selectedEventCategory === '') {
      this.events = this.allEvents.filter(
        event =>
          this.priceFilterCondition(event, selectedPriceOption) &&
          this.locationFilterCondition(event, selectedLocationOption)
      );
    } else {
      this.events = this.allEvents.filter(
        event =>
          event.category === this.selectedEventCategory &&
          this.priceFilterCondition(event, selectedPriceOption) &&
          this.locationFilterCondition(event, selectedLocationOption)
      );
    }

    if (this.sortByFilter.value !== 'Default') {
      this.sortEvents();
    }
  }

  priceFilterCondition(event: MyEvents, selectedPriceOption: string): boolean {
    const eventPrice = event.price ? +event.price : 0;

    return (
      selectedPriceOption === '0' ||
      (selectedPriceOption === '1' && eventPrice === 0) ||
      (selectedPriceOption === '2' && eventPrice >= 1 && eventPrice <= 4999) ||
      (selectedPriceOption === '3' && eventPrice >= 5000 && eventPrice <= 9999) ||
      (selectedPriceOption === '4' && eventPrice >= 10000)
    );
  }

  locationFilterCondition(event: MyEvents, selectedLocationOption: string): boolean {
    return (
      selectedLocationOption === 'Any' ||
      (selectedLocationOption === 'Budapest' && event.place === 'Budapest') ||
      (selectedLocationOption === 'Online' && event.place === 'Online') ||
      (selectedLocationOption === 'Other' && event.place !== 'Budapest' && event.place !== 'Online')
    );
  }

  sortEvents() {
    const sortBy = this.sortByFilter.value;
    const eventsToSort = [...this.events];

    switch (sortBy) {
      case 'Default':
        this.events = [...this.allEvents];
        break;
      case 'PriceLowToHigh':
        this.events = eventsToSort.sort((a, b) => (a.price || 0) - (b.price || 0));
        break;
      case 'PriceHighToLow':
        this.events = eventsToSort.sort((a, b) => (b.price || 0) - (a.price || 0));
        break;
      default:
        break;
    }
  }

  onCategoryClick(category: string) {
    this.selectedEventCategory = this.selectedEventCategory === category ? null : category;
    this.applyFilters();

    
  }

  onViewDetailsClick(eventId: string, eventType: string) {
    this.router.navigate(['/event', eventType, eventId]);
  }

 
}
