import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';
import { UserService } from 'src/app/services/user/user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  
  constructor(private afAuth: AngularFireAuth,
    private userService: UserService,
    private router: Router) {
    }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
    return this.userService.getCurrentUser()
      .then(usr => {
        if (usr) {
          this.router.navigate(['/']);
          return false;
        }
      })
      .catch(err => {
        return true;
      });
  }
  
}
