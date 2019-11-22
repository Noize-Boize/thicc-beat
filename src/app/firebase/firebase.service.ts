import { Injectable } from '@angular/core';

import {AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  userFiles : Observable<any[]>;

  constructor(private firestore: AngularFirestore) { }

  loadUserSeqFiles()
  {
    return this.firestore.collection("sequencerFiles").valueChanges();
  }
}
