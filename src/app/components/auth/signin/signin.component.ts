import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent {
  email:string=""
  password:string=""

  constructor(private auth:AuthService,   
    private router:Router){}
  
    googleAuth(){
      this.auth.googleAuth()
      
    }

    signIn(){
      this.auth.signIn(this.email,this.password).then(
        ()=>this.router.navigate(['/home'])
      )
      .catch(
        (e)=>console.log(e)
      )
    }

    validUser(){
      return false
    }
}
