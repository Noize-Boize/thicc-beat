import { Injectable } from '@angular/core';

import {User} from './user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private currentUser = new User();

  constructor() { }

  printUserInfo(){
    console.log(
      ' id',this.currentUser.id,'\n',
      'name',this.currentUser.name,'\n',
      'userName',this.currentUser.userName,'\n',
      'email',this.currentUser.email,'\n'
    )
  }
  getLoggedInName()
  {
    return this.currentUser.name;
  }

  newUser(res){
    // console.log('in new user');
    // console.log(res);
    this.currentUser.email = res.additionalUserInfo.profile.email;
    this.currentUser.name = res.additionalUserInfo.profile.name;
    this.currentUser.id = res.user.uid;
  }

  clearUser()
  {
    this.currentUser.email = null;
    this.currentUser.name = null;
    this.currentUser.id = null;
  }
}
