import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/service/user.service';
import { AuthService } from 'src/app/service/auth.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  userProfile: any = {
    name: '',
    birh: null,
    phoneNumber: '',
  };

  bookmarkedEvents: any[] = [];
  selectedEvent: any = null;

  constructor(private userService: UserService, private authService: AuthService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.userService.getUserProfile().subscribe((profile) => {
      if (profile) {
        this.userProfile = profile;
        this.loadBookmarkedAndFeaturedEvents();
      }
    });

    this.route.queryParams.subscribe(params => {
      const eventId = params['eventId'];
      if (eventId !== null && eventId !== undefined) {
        this.selectEvent(eventId);
      }
    });
  }

  loadBookmarkedAndFeaturedEvents(): void {
    this.userService.getBookmarkedAndFeaturedEvents().subscribe((events) => {
      console.log('Bookmarked and Featured events:', events);
      this.bookmarkedEvents = events;
    });
  }

  saveProfileToFirestore(): void {
    this.userService.updateUserProfile(this.userProfile).then(() => {
      console.log('User profile saved to Firestore successfully.');
    }).catch((error) => {
      console.error('Error saving user profile to Firestore:', error);
    });
  }

  onPhoneChange(newPhone: string): void {
    this.userProfile.phoneNumber = newPhone;
  }

  removeBookmark(eventId: string): void {
    this.userService.removeBookmark(eventId).then(() => {
      console.log('Bookmark removed successfully.');

      // Keresse meg az eseményt a bookmarkedEvents tömbben
      const indexToRemove = this.bookmarkedEvents.findIndex(event => event.eventId === eventId);

      // Ha megtaláljuk az eseményt, távolítsuk el azt a tömbből
      if (indexToRemove !== -1) {
        this.bookmarkedEvents.splice(indexToRemove, 1);
      }
    }).catch((error) => {
      console.error('Error removing bookmark:', error);
    });
  }

  selectEvent(eventId: string): void {
    // Keresse meg az eseményt a bookmarkedEvents tömbben
    const selectedEvent = this.bookmarkedEvents.find(event => event.eventId === eventId);

    // Ha megtaláljuk az eseményt, állítsuk be a selectedEvent-et
    if (selectedEvent) {
      this.selectedEvent = selectedEvent;
    }
  }
}
