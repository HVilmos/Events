
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable, of, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private firestore: AngularFirestore, private auth: AngularFireAuth) {}

  updateUserProfile(profileData: any): Promise<void> {
    return this.auth.currentUser?.then((user) => {
      if (user) {
        return this.firestore.collection('users').doc(user.uid).set(profileData, { merge: true });
      } else {
        return Promise.reject('No user found');
      }
    });
  }
  
  createUserProfile(userData: any): Promise<void> {
    return this.auth.currentUser?.then((user) => {
      if (user) {
        return this.firestore.collection('users').doc(user.uid).set(userData, { merge: true });
      } else {
        return Promise.reject('No user found');
      }
    }) as Promise<void>;
  }

  getUserProfile(): Observable<any> {
    return this.auth.authState.pipe(
      switchMap((user) => {
        if (user) {
          return this.firestore.collection('users').doc(user.uid).valueChanges();
        } else {
          return of(null);
        }
      })
    );
  }
}
