import { Component } from '@angular/core';
import { BookMarkService } from 'src/app/service/book-mark.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {

  constructor(private bookmarkService: BookMarkService) {}

  get bookmarkedEvents() {
    return this.bookmarkService.getBookmarkedEvents();
  }

  removeFromBookmarks(index: number) {
    this.bookmarkService.removeFromBookmarks(index);
  }
}
