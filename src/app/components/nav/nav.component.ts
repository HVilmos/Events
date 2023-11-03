import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponents implements OnInit {
  isAdmin: boolean = false;

  constructor(private auth: AuthService, private router: Router) {}

  ngOnInit() {
    this.auth.getLoggedUser().subscribe((user) => {
      if (user && user.email) {
        this.auth.isAdmin(user.email).then((isAdmin) => {
          this.isAdmin = isAdmin;
        });
      } else {
        this.isAdmin = false;
      }
    });
  }
}
