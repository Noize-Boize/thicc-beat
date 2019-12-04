import { Component, OnInit, ApplicationRef, ChangeDetectionStrategy } from '@angular/core';

import {FirebaseService} from '../firebase/firebase.service';

import { Observable } from 'rxjs';

import { map } from 'rxjs/operators';

import{FSequencer} from '../files/f-sequencer.model';

import{AudioFile} from '../files/audio-file.model';

import {UserService} from '../user/user.service';

import {SequencerService} from '../sequencer/sequencer.service';

import {SamplerService} from '../sampler/sampler.service';


import {AngularFirestore } from '@angular/fire/firestore';

import {AngularFireStorageModule, StorageBucket} from '@angular/fire/storage';

import { AngularFireStorage } from '@angular/fire/storage';
//


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

  private defaultAudio:Array<AudioFile>;

  private cuts:Array<any>;

  private loaded:Array<any>;

  private defaultFile = new FSequencer('defaultFile','jak','[1,0,1,0,0,0]','[pad1,pad2,pad3]');

  private exampleAudio = new AudioFile('sampName','theCoolerestFucker',32,["kick"],'path')

  public profileUrl: Observable<string | null>;

  constructor(private firebaseService: FirebaseService,
              public appRef: ApplicationRef,
              public user: UserService,
              private seq: SequencerService,
              private samp: SamplerService,
              private firestore: AngularFirestore,
              private storage: AngularFireStorage) {

  //var afPath = 'gs://oncemorewithfeeling.appspot.com'
  const ref = this.storage.ref('/oncemorewithfeeling.appspot.com/deep house.wav');
  this.profileUrl=ref.getDownloadURL()
  console.log(this.profileUrl);
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
    this.firestore.collection<AudioFile>('AudioFiles').valueChanges()
    .subscribe(v=> {
      for (var i = 0; i<v.length;i++)
      {
        var temp = new AudioFile(v[i].fileName, v[i].owner, v[i].fLength, v[i].tags, v[i].path);
        this.defaultAudio.push(temp);
      }
    })



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
        this.samp.loadPads(this.userFiles[i].sounds);
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

      }
      else
      {

      }
    }
  }
  displayAfList()
  {
    for(var i = 0; i<this.defaultAudio.length; i++)
    {
      if(this.defaultAudio[i].fileName != null)
      {

      }
      else
      {

      }
    }
  }

  holdName(evt)
  {
    // console.log(typeof evt);
    // console.log(evt.path);
    this.samp.audioClicked(evt);
  }

  refreshList()
  {

  }
}
