import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';
import { BaseService } from 'src/app/service/base.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  email: string = "";
  password: string = "";
  password2: string = "";

  constructor(private auth: AuthService, private base: BaseService, private router: Router) {}

  googleAuth() {
    this.auth.googleAuth();
  }

  addMessage() {
    this.base.addMessage("");
  }

  signUp() {
    const userProfileData = {
      email: this.email,
    };

    this.auth.signUp(this.email, this.password).then(
      () => {
        this.auth.createUserProfile(userProfileData); // itt hozod létre a felhasználó profilját
        this.auth.sendVerificationEmail();
        this.router.navigate(['verifyemail']);
      }
    ).catch(
      (e) => console.log(e)
    );
  }

  validUser() {
    return false;
  }
}
