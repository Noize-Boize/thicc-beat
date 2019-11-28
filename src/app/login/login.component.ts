import { Component, OnInit } from '@angular/core';



import {AuthenticationService} from '../authentication/authentication.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';


// add for modal window
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';


// user service to create a new user.
import{UserService} from '../user/user.service';

import{ListService} from '../list/list.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  errorMessage: string ='';

  constructor(
    public authenticationService: AuthenticationService,
    private form: FormBuilder,
    private modalLib: NgbModal,
    private UserService : UserService,
    private ListService : ListService
  ) { this.createForm();}

  ngOnInit() {
  }

  createForm(){
    this.loginForm = this.form.group({
      email:['',Validators.required],
      password:['',Validators.required]
    });
  }

  validateLogin(data){
    this.authenticationService.login(data)
    .then(res => {
      console.log(res);

    }, err => {
      this.errorMessage = err.message;
    })
  }

  ValidateGoogleLogin(){
    this.authenticationService.googleLoginService()
    .then(res => {
      // console.log(res);
      // console.log(res.additionalUserInfo.profile.name);
      // this.UserService.printUser();
      this.UserService.newUser(res);
      this.ListService.userLogin();
    })
  }


  openModal(modalData) {
    console.log('in open modal');
    this.modalLib.open(modalData, { centered: true });
    //this.UserService.printUserInfo();
  }

  switchModal(){
    console.log('close login modal and display signup modal');
  }

}
