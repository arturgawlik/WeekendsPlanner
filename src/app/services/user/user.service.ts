import { Injectable } from '@angular/core';
import { User } from './user.model';
import * as firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor() {
  }

  getCurrentUser(): Promise<any> {
    return new Promise<any>((resolve, reject) => {
        firebase.auth().onAuthStateChanged(
        user => {
          if (user) {
            resolve(user);
          } else {
            reject('No user logged in');
          }
        }
      )
    })
  }

}
