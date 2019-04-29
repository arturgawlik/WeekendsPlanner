import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from 'src/app/services/user/user.service';

@Injectable({
  providedIn: 'root'
})
export class ShellGuard implements CanActivate {
  
  constructor(private userService: UserService, private router: Router) {
  }
  
  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
    return this.userService.getCurrentUser()
      .then(usr => {
        if (usr) {
          console.log('ret true');
          return true;
        } else {
          console.log('ret false');
          this.router.navigate(['/login']);
          return false;
        }
      })
      .catch(err => {
        return false;
      })
  }
  
}
