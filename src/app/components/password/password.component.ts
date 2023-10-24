import { Component } from '@angular/core';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-password',
  templateUrl: './password.component.html',
  styleUrls: ['./password.component.css']
})
export class PasswordComponent {
email:any;
constructor(private auth:AuthService){
  this.auth.getLoggedUser().subscribe(
    (u)=>this.email=u?.email
  )
}
forgotPassword(){
  this.auth.forgotPassword(this.email)
}
  
}
