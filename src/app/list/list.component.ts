import { Component, OnInit, ApplicationRef, ChangeDetectionStrategy } from '@angular/core';

import {FirebaseService} from '../firebase/firebase.service';

import { Observable } from 'rxjs';

import { map } from 'rxjs/operators';

import{FSequencer} from '../files/f-sequencer.model';

import {UserService} from '../user/user.service';

import {SequencerService} from '../sequencer/sequencer.service';


import {AngularFirestore } from '@angular/fire/firestore';


////// need to add logic to make sure that the user cannot re-click to keep adding to the list.


@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ListComponent implements OnInit {

  public userFiles: Array<FSequencer>;

  public recList: Array<FSequencer>;

  //public userFiles: Array<string>;

  private defaultAudio:Array<any>;

  private cuts:Array<any>;

  private loaded:Array<any>;

  private defaultFile = new FSequencer('defaultFile','jak','[1,0,1,0,0,0]','[pad1,pad2,pad3]');

  constructor(private firebaseService: FirebaseService,
              public appRef: ApplicationRef,
              public user: UserService,
              private seq: SequencerService,
              private firestore: AngularFirestore) {
                this.defaultAudio=[];
                this.loaded=[];
                this.cuts=[];
                this.userFiles=[];

  if(this.user.getLoggedInName() != null)
  {
    console.log('user is logged in');
  }
  else{
    console.log('no user logged in');
  }

 }

  ngOnInit() {

    this.firestore.collection<FSequencer>('sequencerFiles').valueChanges()
    .subscribe(v => {
      for (var i = 0; i<v.length;i++)
      {

        //console.log(v[i]);
        var temp = new FSequencer(v[i].fileName, v[i].owner, v[i].pattern, v[i].sounds);
        this.userFiles.push(temp);
      }
    });

    this.loadDefaultList();


  }

  addList(files)
  {
    return;
  }

  loadUserList()
  {




    this.firestore.collection<FSequencer>('sequencerFiles').valueChanges()
    .subscribe(v => {
      for (var i = 0; i<v.length;i++)
      {

        console.log(v[i]);
        var temp = new FSequencer(v[i].fileName, v[i].owner, v[i].pattern, v[i].sounds);
        this.userFiles.push(temp);
      }
    });
    console.log(this.userFiles);

  }

  newFile(obj)
  {

    this.userFiles.push(new FSequencer(obj.fileName,obj.owner,obj.pattern,obj.sounds)); // = [this.userFiles, temp];
    console.log('newFile print userFiles',this.userFiles)

  }
  loadDefaultList(){
    for(var i = 0; i<this.userFiles.length; i++)
    {

    }

  }

  displayItem(evt)
  {
    for(var i = 0; i<this.userFiles.length; i++)
    {
      //console.log(this.userFiles[i].fileName==evt)
      if(this.userFiles[i].fileName == evt)
      {
        // console.log(this.userFiles[i].fileName);
        // console.log(this.userFiles[i].owner);
        // console.log(this.userFiles[i].pattern);
        // console.log(this.userFiles[i].sounds);
        this.seq.loadSequencerMatrix(this.userFiles[i].pattern);
      }
      else
      {
        //console.log('no matching list items for: ',evt);

      }
    }
  }

  displayList()
  {
    for(var i = 0; i<this.userFiles.length; i++)
    {
      if(this.userFiles[i].fileName != null)
      {
        // console.log(this.userFiles[i].fileName);
        // console.log(this.userFiles[i].owner);
        // console.log(this.userFiles[i].pattern);
        // console.log(this.userFiles[i].sounds);
        // this.seq.loadSequencerMatrix(this.userFiles[i].pattern);
      }
      else
      {
        //console.log('no matching list items for: ',evt);

      }
    }
  }

  refreshList()
  {

  }
}
