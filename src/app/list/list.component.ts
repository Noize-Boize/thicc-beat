import { Component, OnInit } from '@angular/core';

import {FirebaseService} from '../firebase/firebase.service';

import { Observable } from 'rxjs';

import { map } from 'rxjs/operators';

import{FSequencer} from '../files/f-sequencer.model';


@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  public userFiles: Array<FSequencer>;

  //public userFiles: Array<string>;

  private defaultAudio:Array<any>;

  private cuts:Array<any>;

  private loaded:Array<any>;

  private defaultFile = new FSequencer('defaultFile','jak','[1,0,1,0,0,0]','[pad1,pad2,pad3]');

  constructor(private firebaseService: FirebaseService) {
  this.userFiles=[this.defaultFile];
  console.log('list comp const defaultFile',this.defaultFile);
  // console.log('list comp const userFiles 0.fielName: ',this.userFiles[0].fileName);
  // console.log('list comp const userFiles 0 type: ',typeof this.userFiles[0].fileName);
 }

  ngOnInit() {
  }

  loadUserList()
  {

    this.firebaseService.loadUserSeqFiles()
    .subscribe(val =>{
      for(var i = 0;i<val.length;i++){
        console.log('in subscribe',val);
        //console.log('here is i: ',i)
        // console.log(i);
        // console.log(val[i].name)
        // console.log('valI 0',val[i]);
        // var tempFile = new FSequencer(val[0]);
        // console.log(tempFile);
        this.newFile(val[i])
        //this.userFiles.push(new FSequencer(val[i].fileName,val[i].owner,'',''));
        //this.userFiles.push(new FSequencer());
      }
      //console.log('ListComponent sub',val);

    });
    // console.log('listCompLoadUserList 0:\n',this.userFiles[0]);
    // console.log('listCompLoadUserList 1:\n',this.userFiles[1]);
    // console.log('listCompLoadUserList 2:\n',this.userFiles[2]);
    // console.log('listCompLoadUserList 3:\n',this.userFiles[3]);
    // console.log('listCompLoadUserList all:\n',this.userFiles);
    // this.userFiles.forEach(function(ele){
    //   //console.log(ele);
    // })
  }

  newFile(obj)
  {
    var temp = new FSequencer(obj.fileName,obj.owner,obj.pattern,obj.sounds);
    console.log('newFile: \n','fileName',temp.fileName)
    console.log('list comp newFile temp complete: ',temp);
    this.userFiles.push(temp);
    console.log('newFile print userFiles',this.userFiles)
    return temp;
  }
}
