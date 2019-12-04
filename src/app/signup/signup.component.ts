import { Component, OnInit } from '@angular/core';


import { AuthenticationService } from '../authentication/authentication.service';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';



// add for modal window
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  signupForm: FormGroup;
  successMessage: string = '';

  constructor(
    public authenticationService : AuthenticationService,
    private form: FormBuilder,
    private modalLib: NgbModal

  )
  {
    this.createForm();
  }

  ngOnInit() {
  }

  createForm() {
    this.signupForm = this.form.group({
      email: ['',Validators.required],
      password: ['',Validators.required]
    });
  }

  validateSignup(data){
    this.authenticationService.signup(data)
    .then(res => {
      console.log(res);
      this.successMessage = "New account created";
    }, err =>{
      console.log(err.message);
    })
  }

  validateGoogleSignup(){
    this.authenticationService.googleLoginService()
    .then(res =>{
    }, err => console.log(err))
  }



  openModal(modalData) {
    this.modalLib.open(modalData, { centered: true });
  }

  switchModal(){
    console.log('close login modal and display signup modal');
  }

}
