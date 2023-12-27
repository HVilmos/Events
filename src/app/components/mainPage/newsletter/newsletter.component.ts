import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-newsletter',
  templateUrl: './newsletter.component.html',
  styleUrls: ['./newsletter.component.css']
})
export class NewsletterComponent {


  constructor(private firestore: AngularFirestore) {
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
