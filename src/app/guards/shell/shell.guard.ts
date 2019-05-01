import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ShellGuard implements CanActivate {
  
  constructor(private router: Router, private afAuth: AngularFireAuth) {
  }
  
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.afAuth.user.pipe(
      map(res => {
        if (res) {
          return true;
        } else {
          this.router.navigate(['/login']);
          return false;
        }
      })
    )
  }
  
}
