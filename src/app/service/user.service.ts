import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable, combineLatest, of, switchMap } from 'rxjs';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(
    private firestore: AngularFirestore,
    private auth: AngularFireAuth,
    private rtdb: AngularFireDatabase
  ) {}

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

  addBookmark(eventKey: string): Promise<void> {
    return this.auth.currentUser?.then((user) => {
      if (user) {
        const eventRef = this.firestore.collection('bookmarks').doc(user.uid).collection('events').doc(eventKey);
        return eventRef.set({ eventId: eventKey });
      } else {
        return Promise.reject('No user found.');
      }
    });
  }

  removeBookmark(eventKey: string): Promise<void> {
    return this.auth.currentUser?.then((user) => {
      if (user) {
        const eventRef = this.firestore.collection('bookmarks').doc(user.uid).collection('events').doc(eventKey);
        return eventRef.delete();
      } else {
        return Promise.reject('No user found.');
      }
    });
  }

  getFirestoreBookmarks(userId: string): Observable<any[]> {
    return this.firestore
      .collection('bookmarks')
      .doc(userId)
      .collection('events')
      .valueChanges();
  }

  getRealtimeDatabaseFeaturedEvents(): Observable<any[]> {
    // Az 'events' az a Realtime Database útvonala, amely tartalmazza az eseményeket
    const eventsRef = this.rtdb.list('featured');
    
    return eventsRef.snapshotChanges().pipe(
      map(changes => {
        // Átalakítjuk a snapshotChanges eredményeit az esemény objektumokká
        return changes.map(c => {
          const payloadVal = c.payload.val();
          return { eventId: c.payload.key, ...(payloadVal && typeof payloadVal === 'object' ? payloadVal : {}) };
        });
      })
    );
  }
  
  

  getBookmarkedAndFeaturedEvents(): Observable<any[]> {
    return this.auth.authState.pipe(
      switchMap((user) => {
        if (user) {
          const userId = user.uid;
  
          // Combine the Observables from Realtime Database featured events and Firestore bookmarks
          const rtdbFeaturedEvents$ = this.getRealtimeDatabaseFeaturedEvents();
          const firestoreBookmarks$ = this.getFirestoreBookmarks(userId);
  
          return combineLatest([rtdbFeaturedEvents$, firestoreBookmarks$]).pipe(
            map(([rtdbFeaturedEvents, firestoreBookmarks]) => {
              // Merge featured events from Realtime Database with bookmarked events from Firestore
              const allFeaturedEvents = rtdbFeaturedEvents.concat(firestoreBookmarks);
  
              // Filter out events without eventId (empty events)
              const validEvents = allFeaturedEvents.filter(event => event.eventId);
  
              // Remove duplicates based on eventId
              const uniqueEvents = validEvents.reduce((acc, event) => {
                const existingEvent = acc.find((e: any) => e.eventId === event.eventId);
                if (!existingEvent) {
                  acc.push(event);
                }
                return acc;
              }, []);
  
              return uniqueEvents;
            })
          );
        } else {
          // If there is no user, return an empty array or handle accordingly
          return of([]);
        }
      })
    );
  }
  
}
