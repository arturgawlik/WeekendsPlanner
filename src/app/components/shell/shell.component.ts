import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-shell',
  templateUrl: './shell.component.html',
  styleUrls: ['./shell.component.css']
})
export class ShellComponent implements OnInit {

  constructor(private authService: AuthService) {
  }

  ngOnInit() {
    console.log('ngOnInit - shellComponent');
    document.getElementsByTagName('body')[0].style.backgroundImage = null;
  }

  logout() {
    this.authService.doLogout();
  }

}
