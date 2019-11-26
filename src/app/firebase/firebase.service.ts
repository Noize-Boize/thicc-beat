import { Injectable } from '@angular/core';

import {AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { FSequencer} from '../files/f-sequencer.model';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  userFiles : Observable<any[]>;

  recFiles : Array<FSequencer>;

  constructor(private firestore: AngularFirestore) {

    this.recFiles = [];
  }

  loadUserSeqFiles()
  {
    this.firestore.collection("sequencerFiles").valueChanges()
    .subscribe(v => {
      for (var i = 0; i<v.length;i++)
      {
        console.log(v[i]);
      }
    });
    return
  }
}




// loadUserSeqFiles()
// {
//   this.firestore.collection("sequencerFiles").valueChanges()
//   .subscribe(v =>{
//     for(var i = 0;i<v.length;i++){
//       //console.log('in subscribe',v[i]);
//       // console.log(v[i].fileName);
//       // console.log(v[i].owner);
//       // // this.list.push(new file());
//       this.list.push(new File(v[i].fileName, v[i].owner, v[i].pattern, v[i].sounds));
//       console.log('first list index',this.list[1]);
//       //console.log('the whole list',this.list);
//
//     }
//   });
// }
