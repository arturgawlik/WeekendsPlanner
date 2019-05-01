import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  images =
    [
      'https://aadcdn.msauth.net/ests/2.1/content/images/backgrounds/0_a5dbd4393ff6a725c7e62b61df7e72f0.jpg',
      'https://images.pexels.com/photos/459225/pexels-photo-459225.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
      'https://images.pexels.com/photos/34950/pexels-photo.jpg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
      'https://images.pexels.com/photos/807598/pexels-photo-807598.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
      'https://images.pexels.com/photos/4827/nature-forest-trees-fog.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
      'https://images.pexels.com/photos/66997/pexels-photo-66997.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
      'https://images.pexels.com/photos/346529/pexels-photo-346529.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
      'https://images.pexels.com/photos/414171/pexels-photo-414171.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
      'https://images.pexels.com/photos/956981/milky-way-starry-sky-night-sky-star-956981.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
      'https://images.pexels.com/photos/933054/pexels-photo-933054.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
      'https://images.pexels.com/photos/884788/pexels-photo-884788.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
      'https://images.pexels.com/photos/1054289/pexels-photo-1054289.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
      'https://images.pexels.com/photos/395132/pexels-photo-395132.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
      'https://images.pexels.com/photos/1123445/pexels-photo-1123445.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
      'https://images.pexels.com/photos/1054222/pexels-photo-1054222.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
      'https://images.pexels.com/photos/831243/pexels-photo-831243.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
      'https://images.pexels.com/photos/196665/pexels-photo-196665.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940'
    ];
  loggingWithFacebook = false;
  loggingWithGoogle = false;

  constructor(private authService: AuthService) {
  }

  ngOnInit() {
    const imageIndex = Math.floor(Math.random() * (this.images.length - 1));
    document.getElementsByTagName('body')[0].style.backgroundImage = `url(${this.images[imageIndex]})`;
  }

  loginWithGoogle() {
    this.authService.doLoginWithGoogle()
    .catch(err => {
      console.error(err);
      this.loggingWithFacebook = false;
      this.loggingWithGoogle = false;
    });
    this.loggingWithFacebook = false;
    this.loggingWithGoogle = true;
  }

  loginWithFacebook() {
    this.authService.doFacebookLogin()
    .catch(err => {
      console.error(err);
      this.loggingWithFacebook = false;
      this.loggingWithGoogle = false;
    });
    this.loggingWithGoogle = false;
    this.loggingWithFacebook = true;
  }

}
