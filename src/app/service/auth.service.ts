import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { GoogleAuthProvider } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
 
})
export class AuthService {
  url="https://europe-west1-events-d1a32.cloudfunctions.net/api/"
  
  constructor(private afAuth:AngularFireAuth,
    private router:Router, private http: HttpClient, private firestore: AngularFirestore) { }

  getUsers(){
    this.getLoggedUser().subscribe(
      (user)=>{
        user?.getIdToken().then(
          (t)=>{
            let headers = new HttpHeaders().set('Authorization', t)
            return this.http.get(this.url+'users', {headers}).
            subscribe({
              next:(users)=>console.log(users),
              error:(e)=>console.log(e)
            })
          }
        )
      }
    )
  }
    

  googleAuth(){

    this.afAuth.signInWithPopup(new GoogleAuthProvider()).then(
      (u)=>{
        console.log("Google regisztráció",u)
        this.router.navigate(['/home'])
      }
    )
  }

  signUp(email:string, password:string)
  {
    return this.afAuth.createUserWithEmailAndPassword(email, password)
  }

  signIn(email:string, password:string)
  {
    return this.afAuth.signInWithEmailAndPassword(email, password)
  }

  signOut(){
    return this.afAuth.signOut()
  }

  getLoggedUser(){
    return this.afAuth.authState
  }

  sendVerificationEmail(){
    this.afAuth.currentUser.then(
      (user)=>user?.sendEmailVerification()
    ).then(
      ()=>this.router.navigate(['verifyemail'])
    )
    .catch((e)=>console.log(e))
  }

  forgotPassword(email:string){
    return this.afAuth.sendPasswordResetEmail(email)
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