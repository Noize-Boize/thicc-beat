import { Component, OnInit, ApplicationRef, ChangeDetectionStrategy } from '@angular/core';

import {FirebaseService} from '../firebase/firebase.service';

import { Observable } from 'rxjs';

import { map } from 'rxjs/operators';

import{FSequencer} from '../files/f-sequencer.model';

import {UserService} from '../user/user.service';


////// need to add logic to make sure that the user cannot reclick to keep adding to the list.


@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ListComponent implements OnInit {

  public userFiles: Array<FSequencer>;

  public displayList: Array<string>;

  //public userFiles: Array<string>;

  private defaultAudio:Array<any>;

  private cuts:Array<any>;

  private loaded:Array<any>;

  private defaultFile = new FSequencer('defaultFile','jak','[1,0,1,0,0,0]','[pad1,pad2,pad3]');

  constructor(private firebaseService: FirebaseService,
              public appRef: ApplicationRef,
              public user: UserService) {
  this.userFiles=[this.defaultFile];
  //this.userFiles.push('ass');
  //console.log('list comp const defaultFile',this.defaultFile);
  // console.log('list comp const userFiles 0.fielName: ',this.userFiles[0].fileName);
  // console.log('list comp const userFiles 0 type: ',typeof this.userFiles[0].fileName);

  // appRef.isStable.pipe(
  //    filter(stable => stable)
  // ).subscribe(() => console.log('App is stable now'));
  // interval(1000).subscribe(counter => console.log(counter));
  if(this.user.getLoggedInName() != null)
  {
    console.log('user is logged in');
  }
  else{
    console.log('no user logged in');
  }

 }

  ngOnInit() {
  }

  addList(files)
  {
    return;
  }


































































  loadUserList()
  {

    this.firebaseService.loadUserSeqFiles();
    // .subscribe(val =>{
    //   for(var i = 0;i<val.length;i++){
    //     console.log('in subscribe',val);
    //     //console.log('here is i: ',i)
    //     // console.log(i);
    //     // console.log(val[i].name)
    //     // console.log('valI 0',val[i]);
    //     // var tempFile = new FSequencer(val[0]);
    //     // console.log(tempFile);
    //     //this.newFile(val[i])
    //     //this.userFiles.push(new FSequencer(val[i].fileName,val[i].owner,'',''));
    //     //this.userFiles.push(new FSequencer());
    //   }
    //   //console.log('ListComponent sub',val);
    //
    // });
    // console.log('listCompLoadUserList 0:\n',this.userFiles[0]);
    // console.log('listCompLoadUserList 1:\n',this.userFiles[1]);
    // console.log('listCompLoadUserList 2:\n',this.userFiles[2]);
    // console.log('listCompLoadUserList 3:\n',this.userFiles[3]);
    // console.log('listCompLoadUserList all:\n',this.userFiles);
    // this.userFiles.forEach(function(ele){
    //   //console.log(ele);
    // })


    //this.appRef.tick();
  }

  newFile(obj)
  {
    // var temp = new FSequencer(obj.fileName,obj.owner,obj.pattern,obj.sounds);
    // console.log('newFile: \n','fileName',temp.fileName)
    // console.log('list comp newFile temp complete: ',temp);
    this.userFiles.push(new FSequencer(obj.fileName,obj.owner,obj.pattern,obj.sounds)); // = [this.userFiles, temp];
    console.log('newFile print userFiles',this.userFiles)

    //return temp;
  }

  displayItem(evt)
  {
    for(var i = 0; i<this.userFiles.length; i++)
    {
      if(this.userFiles[i].fileName == evt)
      {
        console.log(this.userFiles);
      }
      else
      {
        console.log('no matching list items for: ',evt);
      }
    }
  }

  refreshList()
  {

  }
}
