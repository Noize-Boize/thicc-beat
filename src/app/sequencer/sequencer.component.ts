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

  //pass in 1. sampler value(C4) 2. point on transport(0:0:0)
  activate(cellId){


    //if(toggleValue = 0){
    //toggleValue=1
    //turn on engaged color
    document.getElementById(cellId).style.backgroundColor = "yellow";
    //schedule value on transport}
    //else{
    //that means toggleValue=1 so it's engaged
    //so toggleValue=0 now
    //take the note out of the transport scheduler
    //change color back
    //document.getElementById(cellId).style.backgroundColor = "black";

    //}

    //What i'm trying to achieve
    //Tone.Transport.schedule(function(){
    //  sampler.triggerAttack(samplerNote);
    //}, passedInTimeValue);

  }



}
