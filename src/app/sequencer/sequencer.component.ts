import { Component, OnInit } from '@angular/core';
import * as Tone from 'tone';
import * as Nexus from 'nexusui';

var sequencerToggle = [
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
];

@Component({
  selector: 'app-sequencer',
  templateUrl: './sequencer.component.html',
  styleUrls: ['./sequencer.component.css']
})
export class SequencerComponent implements OnInit {

  constructor() { }

  ngOnInit() {



  }

  //(not added)pass in 1. sampler value(C4) 2. point on transport(0:0:0)
  //include in arguments toggleValue
  activate(cellId){
    var toggleValue = this.getSeqCellVal(cellId);
    if(toggleValue == 0){
      document.getElementById(cellId).style.backgroundColor = "yellow";
      this.setSeqCellVal(cellId);
      //schedule value on transport
    }
    else{
      document.getElementById(cellId).style.backgroundColor = "black";
      this.setSeqCellVal(cellId);
      //take the note out of the transport scheduler
    }
    //What i'm trying to achieve
    //Tone.Transport.schedule(function(){
    //  sampler.triggerAttack(samplerNote);
    //}, passedInTimeValue);
  }

  //this gets the matrix value out of the name
  getSeqCellVal(cellId){
    var r = document.getElementById(cellId).id.charAt(cellId.length-2);
    var c = document.getElementById(cellId).id.charAt(cellId.length-1);
    var toggle = sequencerToggle[r][c];

    return parseInt(toggle);
  }

  setSeqCellVal(cellId){
    var r = document.getElementById(cellId).id.charAt(cellId.length-2);
    var c = document.getElementById(cellId).id.charAt(cellId.length-1);
    var toggle = sequencerToggle[parseInt(r)][parseInt(c)];
    if(toggle == 0){
      sequencerToggle[parseInt(r)][parseInt(c)]=1;
    }
    else{
      sequencerToggle[parseInt(r)][parseInt(c)]=0;
    }

  }



}
