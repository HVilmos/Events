import { Component } from '@angular/core';
import { map } from 'rxjs';
import { BaseService } from 'src/app/service/base.service';

@Component({
  selector: 'app-admin-business',
  templateUrl: './admin-business.component.html',
  styleUrls: ['./admin-business.component.css']
})
export class AdminBusinessComponent {
  newCard: any = {}; 
  events: any[] = []; 

  constructor(private base: BaseService) {
    this.base.getData().snapshotChanges().pipe(
      map((changes) => changes.map(
        (c) => ({ key: c.payload.key, ...c.payload.val() })
      ))
    ).subscribe(adatok => this.events = adatok);
  }

  submitForm() {
  
    if (this.newCard.name && this.newCard.description && this.newCard.imgUrl && this.newCard.price && this.newCard.date ) {
      this.base.newData(this.newCard);
      this.newCard = {};
    } else {
      alert('Kérlek töltsd ki az összes mezőt!');
    }
  }
  

  eventDelete(index: number) {
    const eventToDelete = this.events[index];
    this.base.deleteData(eventToDelete.key);
  }
}
