import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BookMarkService {

  private readonly storageKey = 'bookmarkedEvents';
  bookmarkedEvents: any[] = [];

  constructor() {
    const storedBookmarks = localStorage.getItem(this.storageKey);
    this.bookmarkedEvents = storedBookmarks ? JSON.parse(storedBookmarks) : [];
  }

  addToBookmarks(event: any) {
    // Ellenőrizze, hogy az esemény még nincs-e a könyvjelzők között
    if (!this.isEventBookmarked(event)) {
      this.bookmarkedEvents.push(event);
      this.saveToLocalStorage();
    }
  }

  removeFromBookmarks(index: number) {
    this.bookmarkedEvents.splice(index, 1);
    this.saveToLocalStorage();
  }

  getBookmarkedEvents() {
    return this.bookmarkedEvents;
  }

  private isEventBookmarked(event: any): boolean {
    return this.bookmarkedEvents.some((bookmark) => bookmark.key === event.key);
  }

  private saveToLocalStorage() {
    localStorage.setItem(this.storageKey, JSON.stringify(this.bookmarkedEvents));
  }
}
