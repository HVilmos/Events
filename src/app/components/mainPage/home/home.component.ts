import { Component } from '@angular/core';


interface MyEvent {
  date?: string;
  dateFormatted?: string;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

}
