import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SamplerComponent } from './sampler/sampler.component';
import { SequencerComponent } from './sequencer/sequencer.component';
import { WaveformComponent } from './waveform/waveform.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { ListComponent } from './list/list.component';


// firebase imports
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { environment } from '../environments/environment';


// This will allow the use of angular forms in the html forms for signup and login

import { FormsModule, ReactiveFormsModule } from '@angular/forms';


// this allows for modal forms
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';


// import the UserService
// importing the service here and in the providers section makes this a singleton service.
import { UserService} from './user/user.service';







@NgModule({
  declarations: [
    AppComponent,
    SamplerComponent,
    SequencerComponent,
    WaveformComponent,
    SignupComponent,
    LoginComponent,
    ListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,


    // declare firebase directives
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule, // imports firebase/firestore, only needed for database features
    AngularFireAuthModule, // imports firebase/auth, only needed for auth features


    // for the use of forms for the login information.
    FormsModule,
    ReactiveFormsModule,
    // this allows for modal forms
    NgbModule
  ],
  providers: [UserService,ListComponent,SequencerComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
