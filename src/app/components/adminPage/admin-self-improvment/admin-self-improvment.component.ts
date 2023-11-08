import { Component } from '@angular/core';
import { map } from 'rxjs';
import { BaseService } from 'src/app/service/base.service';

@Component({
  selector: 'app-admin-self-improvment',
  templateUrl: './admin-self-improvment.component.html',
  styleUrls: ['./admin-self-improvment.component.css']
})
export class AdminSelfImprovmentComponent {
  newCard: any = {}; 
  events: any[] = []; 

  constructor(private base: BaseService) {
    this.base.getSelfImprovementData().snapshotChanges().pipe(
      map((changes) => changes.map(
        (c) => ({ key: c.payload.key, ...c.payload.val() })
      ))
    ).subscribe(adatok => this.events = adatok);
  }

  submitForm() {
    if (this.newCard.name && this.newCard.description && this.newCard.imgUrl && this.newCard.price && this.newCard.date) {
      this.base.newDataSelfImprovement(this.newCard);
      this.newCard = {};
    } else {
      alert('Kérlek töltsd ki az összes mezőt!');
    }
  }

  eventDelete(index: number) {
    const eventToDelete = this.events[index];
    this.base.deleteDataSelfImprovement(eventToDelete.key);
  }
}
