import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Router, NavigationStart, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-shell',
  templateUrl: './shell.component.html',
  styleUrls: ['./shell.component.css']
})
export class ShellComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router) {
  }

  customClasses: string;

  ngOnInit() {
    console.log('ngOnInit - shellComponent');
    document.getElementsByTagName('body')[0].style.backgroundImage = null;

    this.router.events.pipe(
      filter(event => event instanceof NavigationStart)
    )
    .subscribe((e: NavigationEnd) => {
      this.checkCustomClassesByRoute(e.url)
    });
    this.checkCustomClassesByRoute(this.router.url);
  }

  logout() {
    this.authService.doLogout();
  }

  checkCustomClassesByRoute(url: string) {
    if (url === '/plan-new') {
      this.customClasses = 'no-left-right-padding';
    } else {
      this.customClasses = null;
    }
  }

}
