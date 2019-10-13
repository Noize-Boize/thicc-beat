import { Component, OnInit } from '@angular/core';
import * as Tone from 'tone';
import * as Nexus from 'nexusui';

//toggle matrix
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
    //future problem. Need a universal transport or sync this one
    //Tone.Transport.loop = true;
    //Tone.Transport.loopStart="0:0:0";
    //Tone.Transport.loopEnd ="4:0:0";
    //Tone.Transport.bpm.value = 120;
    //Tone.Transport.start();
  }

  //here's where the real shit goes down
  activate(cellId){
    //get clicked cells current toggle matrix value (engaged or not)
    var toggleValue = this.getSeqCellVal(cellId);
    //if it was off when you pressed the box
    if(toggleValue == 0){
      document.getElementById(cellId).style.backgroundColor = "#faed27";
      this.setSeqCellVal(cellId);
      console.log(sequencerToggle);
      //this line will get the note value and position in a single string
      var note_pos = document.getElementById(cellId).getAttribute('data-note_pos');
      var note = this.getNote(note_pos);
      var position = this.getPosition(note_pos);
      console.log(note);
      console.log(position);
      //schedule value on transport
    }
    //if it was already activated and you clicked it, take that shit up outta here
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


  //these some mf string functions. Don't change the name of the divs or all this is fucked
  //this gets the cell position value out of the name for the toggle matrix
  getSeqCellVal(cellId){
    var r = document.getElementById(cellId).id.charAt(cellId.length-3);
    var c = document.getElementById(cellId).id.substring(cellId.length-2,cellId.length);
    var toggle = sequencerToggle[r][parseInt(c)];

    return parseInt(toggle);
  }
  //sets the passed cellId as active or inactive in the toggle matrix
  setSeqCellVal(cellId){
    var r = document.getElementById(cellId).id.charAt(cellId.length-3);
    var c = document.getElementById(cellId).id.substring(cellId.length-2,cellId.length);
    var toggle = sequencerToggle[parseInt(r)][parseInt(c)];
    if(toggle == 0){
      sequencerToggle[parseInt(r)][parseInt(c)]=1;
    }
    else{
      sequencerToggle[parseInt(r)][parseInt(c)]=0;
    }

  }
  //extract the note value
  getNote(cellId){
    var note = cellId.substring(0,2);
    return note;
  }
  //extract the position value
  getPosition(cellId){
    var position = cellId.substring(3,cellId.length);
    return position;
  }



}
