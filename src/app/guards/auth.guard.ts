import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { User } from '@firebase/auth-types';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';

interface AuthState {
  uid: string | null;
  // Egyéb authState tulajdonságok, ha szükséges
}

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private auth: AngularFireAuth, private router: Router) {}

  canActivate(): Observable<boolean> {
    return this.auth.authState.pipe(
      take(1),
      map((authState: User | null) => {
        if (authState?.uid) {
          return true; // A felhasználó be van jelentkezve
        } else {
          return false; // A felhasználó nincs bejelentkezve, irányítson át a bejelentkezési oldalra
        }
      })
    );
  }
}
