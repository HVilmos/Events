import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/service/user.service';
import { AuthService } from 'src/app/service/auth.service';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { AngularFirestore } from '@angular/fire/compat/firestore';

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

  constructor(private firestore: AngularFirestore, private userService: UserService, private authService: AuthService, private router: Router) {
  }
  ngOnInit(): void {
    this.userService.getUserProfile().subscribe((profile) => {
      if (profile) {
        this.userProfile = profile;
      }
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

  logout(): void {
    this.authService.signOut().then(() => {
      this.router.navigate(['/home']);
    }).catch((error) => {
      console.error('Error logging out:', error);
    });
  }

  email: string = '';


  saveEmailToFirestore(email: string): void {
    if (email) {
      this.firestore.collection('newsletter').add({ email })
        .then(() => {
          alert('Thank you for subscribing!');
        })
        .catch((error) => {
          console.error('Error saving email to Firestore:', error);
          alert('Failed to subscribe. Please try again later.');
        });
    } else {
      console.error('Email is undefined or empty.');
      alert('Invalid email address. Please enter a valid email.');
    }
  }
  

  onSubmit(form: NgForm): void {
    const email = form.value.emailInput;
    if (this.isValidEmail(email)) {
      this.saveEmailToFirestore(email);
      form.resetForm(); 
    } else {
      alert('Invalid email address!');
    }
  }

  isValidEmail(email: string): boolean {
    return true; 
  }
}