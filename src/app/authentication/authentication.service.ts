import { Injectable } from '@angular/core';




// Bring on the firebase
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase/app';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(public Auth:AngularFireAuth) { }


  signup(data)
{
  return new Promise<any>((resolve, reject) =>{
    firebase.auth().createUserWithEmailAndPassword(data.email, data.password)
    .then(res =>{
      resolve(res);
    }, err => reject(err))
  })
}

login(data)
{
  return new Promise<any>((resolve,reject) => {
    firebase.auth().signInWithEmailAndPassword(data.email,data.password)
    .then(res =>{
      resolve(res);
    }, err => reject(err))
  })
}

googleLoginService()
{
  return new Promise<any>((resolve, reject) =>{
    let provider = new firebase.auth.GoogleAuthProvider();
    provider.addScope('email');
    this.Auth.auth
    .signInWithPopup(provider)
    .then(res =>{
      resolve(res);
    }, err =>{
      console.log(err);
      reject(err);
    })
  })
}
}
