
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { GoogleAuthProvider } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  url="https://europe-west1-events-d1a32.cloudfunctions.net/api/"
  
  constructor(
    private afAuth: AngularFireAuth,
    private router: Router,
    private http: HttpClient,
    private firestore: AngularFirestore,
    private userService: UserService
  ) {}

  getUsers() {
    this.getLoggedUser().subscribe((user) => {
      user?.getIdToken().then((t) => {
        let headers = new HttpHeaders().set('Authorization', t);
        return this.http.get(this.url + 'users', { headers }).subscribe({
          next: (users) => console.log(users),
          error: (e) => console.log(e)
        });
      });
    });
  }

  createUserProfile(userData: any): Promise<void> {
    return this.afAuth.currentUser?.then((user) => {
      if (user) {
        return this.firestore
          .collection('users')
          .doc(user.uid)
          .set(userData, { merge: true });
      } else {
        return Promise.reject('No user found');
      }
    }) as Promise<void>;
  }

  saveUserProfileToFirestore(userProfile: any): void {
    if (userProfile) {
      this.userService
        .updateUserProfile(userProfile)
        .then(() => {
          console.log('User profile updated successfully.');
        })
        .catch((error) => {
          console.error('Error updating user profile:', error);
        });
    }
  }

  googleAuth() {
    this.afAuth.signInWithPopup(new GoogleAuthProvider()).then((result) => {
      const user = result.user;
      const additionalUserInfo = result.additionalUserInfo;
  
      if (additionalUserInfo?.profile) {
        if ('name' in additionalUserInfo.profile && 'birh' in additionalUserInfo.profile && 'phoneNumber' in additionalUserInfo.profile) {
          const userProfileData = {
            email: user?.email,
            name: additionalUserInfo.profile.name as string,
            birh: additionalUserInfo.profile.birh as string,
            phoneNumber: additionalUserInfo.profile.phoneNumber as string,
          };
  
          this.userService.createUserProfile(userProfileData).then(() => {
            console.log('User profile created successfully.');
          }).catch((error) => {
            console.error('Error creating user profile:', error);
          });
        } else {
          console.warn('Profile does not have the required properties.');
        }
      } else {
        console.warn('No additional user info or profile data found.');
      }
  
      this.router.navigate(['/home']);
    }).catch((error) => {
      console.error('Google sign-in error:', error);
    });
  }
  


  signUp(email:string, password:string)
  {
    return this.afAuth.createUserWithEmailAndPassword(email, password);
  }

  signIn(email:string, password:string)
  {
    return this.afAuth.signInWithEmailAndPassword(email, password);
  }

  signOut(){
    return this.afAuth.signOut();
  }

  getLoggedUser(){
    return this.afAuth.authState;
  }

  sendVerificationEmail(){
    this.afAuth.currentUser.then(
      (user)=>user?.sendEmailVerification()
    ).then(
      ()=>this.router.navigate(['verifyemail'])
    )
    .catch((e)=>console.log(e));
  }

  forgotPassword(email:string){
    return this.afAuth.sendPasswordResetEmail(email);
  }

  isAdmin(email: string): Promise<boolean> {
    return this.firestore
      .collection('admins', (ref) => ref.where('email', '==', email))
      .get()
      .toPromise()
      .then((querySnapshot) => {
        if (querySnapshot) {
          return !querySnapshot.empty;
        } else {
          return false;
        }
      });
  }

  
}
