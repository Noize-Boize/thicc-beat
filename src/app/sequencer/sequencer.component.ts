import { Component, OnInit } from '@angular/core';

import * as Tone from 'tone';


Tone.Transport.start();

// 1D array with 16 columnss
var sequencerMatrix = new Array(16);

// loop over 1D array to create 16x4 2D Array
for(var i=0;i<16;i++){
  sequencerMatrix[i] = [false,false,false,false];
}

var c4Array = ['','','','','','','','','','','','','','','',''];
var d4Array = ['','','','','','','','','','','','','','','',''];
var e4Array = ['','','','','','','','','','','','','','','',''];
var f4Array = ['','','','','','','','','','','','','','','',''];

var sampler = new Tone.Sampler({
  "C4" : "kick 3.wav",
  "D4" : "crash hit.wav",
  "E4" : "kick snare.wav",
  "F4" : "high hats.wav"
},{
  "baseUrl": "./../../assets/JakeAudioSample/"
}).toMaster();

var synth1 = new Tone.Synth().toMaster();
var synth2 = new Tone.Synth().toMaster();

var seq1 = new Tone.Sequence(function(time, note)
{

  if(!note){
  }
  else{
    sampler.triggerAttack(note);

  }

}, c4Array, "4n");

var seq2 = new Tone.Sequence(function(time, note)
{

  if(!note){
  }
  else{
    sampler.triggerAttack(note);
  }
}, d4Array, "4n");

var seq3 = new Tone.Sequence(function(time, note)
{

  if(!note){
  }
  else{
    sampler.triggerAttack(note);
  }
}, e4Array, "4n");

var seq4 = new Tone.Sequence(function(time, note)
{

  if(!note){
  }
  else{
    sampler.triggerAttack(note);
  }
}, f4Array, "4n");




@Component({
  selector: 'app-sequencer',
  templateUrl: './sequencer.component.html',
  styleUrls: ['./sequencer.component.css']
})
export class SequencerComponent implements OnInit {

  public notes: Array<string>;
  public columns: Array<string>;
  constructor() {

    this.notes = ['C4','D4','E4','F4'];

    this.columns = ['00','01','02','03','04','05','06','07',
                    '08','09','10','11','12','13','14','15'];

   }

  ngOnInit() {
  }

  play(){
    if(seq1.state=="stopped"){
      seq1.start();
      seq2.start();
      seq3.start();
      seq4.start();
    }
    else
    {
      seq1.stop();
      seq2.stop();
      seq3.stop();
      seq4.stop();
    }
    return;
  }


  toggleCell(event)
  {
    var id = event.target.attributes.id.textContent;

    if(id.length == 7)
    {
      var x = id.slice(0,2);

      var y = id.slice(3,4);

      var note = id.slice(5);
    }
    else
    {
      var x = id.slice(0,1);

      var y = id.slice(2,3);

      var note = id.slice(4);
    }
    var cellValue = sequencerMatrix[x][y];

    if(cellValue == false)
    {
      document.getElementById(id).style.backgroundColor = "#faed27";
      this.changeArrayValue(note,x,y,false);

    }
    else
    {
      document.getElementById(id).style.backgroundColor = "black";
      this.changeArrayValue(note,x,y,true);

    }
    sequencerMatrix[x][y] = !sequencerMatrix[x][y];
  }

  changeArrayValue(note,x,y,boolean){

    switch(note){
      case 'C4':
        if(boolean == true)
        {
          seq1.remove(x);
        }
        else
        {
            seq1.add(x,note);
        }
        break;
      case 'D4':
        if(boolean == true)
        {
          seq2.remove(x);
        }
        else
        {
            seq2.add(x,note);
        }
        break;
      case 'E4':
        if(boolean == true)
        {
          seq3.remove(x);
        }
        else
        {
            seq3.add(x,note);
        }
        break;
      case 'F4':
        if(boolean == true)
        {
          seq4.remove(x);
        }
        else
        {
            seq4.add(x,note);
        }
        break;
      default:
        break;
    }
  }

}
