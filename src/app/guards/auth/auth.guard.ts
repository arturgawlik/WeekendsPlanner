import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';
import { map, first } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  
  constructor(private afAuth: AngularFireAuth,
    private router: Router) {
    }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.afAuth.user.pipe(
      map(res => {
        if (res) {
          this.router.navigate(['/']);
          return false;
        } else {
          return true;
        }
      })
    )
  }
  
}
