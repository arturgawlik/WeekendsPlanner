import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { auth } from "firebase/app";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private afAuth: AngularFireAuth, private router: Router) {
  }

  doFacebookLogin() {
    return new Promise<any>((resolve, reject) => {
      let provider = new auth.FacebookAuthProvider();
      this.afAuth.auth
      .signInWithPopup(provider)
      .then(res => {
        this.router.navigate(['']);
        resolve(res);
      }, err => reject(err));
    });
  }

  doLoginWithGoogle() {
    return new Promise<any>((resolve, reject) =>{
      let provider = new auth.GoogleAuthProvider();
      provider.addScope('profile');
      provider.addScope('email');
      this.afAuth.auth
      .signInWithPopup(provider)
      .then(res => {
        this.router.navigate(['']);
        resolve(res);
      }, err => reject(err));
    })
  }

  doRegister(email: string, password: string) {
    return new Promise<any>((resolve, reject) => {
      auth().createUserWithEmailAndPassword(email, password)
      .then(res => resolve(res), err => reject(err));
    })
  }

  doLogin(email: string, password: string) {
    return new Promise<any>((resolve, reject) => {
      auth().signInWithEmailAndPassword(email, password)
      .then(res => {
        this.router.navigate(['']);
        resolve(res);
      }, err => reject(err));
    })
  }

  doLogout() {
    return new Promise<any>((resolve, reject) => {
      if (this.afAuth.auth.currentUser) {
        this.afAuth.auth.signOut()
        .then(res => {
          this.router.navigate(['login']);
          resolve();
        })
        .catch(err => {
          reject();
        });
      } else {
        reject();
      }
    })
  }

}
