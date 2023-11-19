import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/service/user.service';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  userProfile: any = {
    name: '',
    birh: null,
    phoneNumber: ''
  };

  constructor(private userService: UserService, private authService: AuthService) {}

  ngOnInit(): void {
    this.userService.getUserProfile().subscribe((profile) => {
      if (profile) {
        this.userProfile = profile;
      }
    });
  }

  saveProfileToFirestore(): void {
    // Mentés a Firestore-ba
    this.userService.updateUserProfile(this.userProfile).then(() => {
      console.log('User profile saved to Firestore successfully.');
    }).catch((error) => {
      console.error('Error saving user profile to Firestore:', error);
    });
  }

  onPhoneChange(newPhone: string): void {
    // Megváltozott telefonszám mentése
    this.userProfile.phoneNumber = newPhone;
  }
  
}
