import { Component, OnInit } from '@angular/core';

import * as Tone from 'tone';


Tone.Transport.start();

// 1D array with 16 columnss
var sequencerMatrix = new Array(16);

// loop over 1D array to create 16x4 2D Array
for(var i=0;i<16;i++){
  sequencerMatrix[i] = [false,false,false,false];
}


var sampler = new Tone.Sampler({
  "C4" : "ILLUMINATI.mp3",
  "D4" : "RECORD SCRATCH.mp3",
  "E4" : "NOPE",
  "F4" : "SCREAM"
},{
  "baseUrl": "./../../assets/audioSamples/"
}).toMaster();

var synth = new Tone.Synth().toMaster();

var seq = new Tone.Sequence(function(time, note)
{

  //synth.triggerAttackRelease(note,'8n',time);
  sampler.triggerAttack(note);
}, ['C4','D6','E3','F6'], "4n");





@Component({
  selector: 'app-sequencer',
  templateUrl: './sequencer.component.html',
  styleUrls: ['./sequencer.component.css']
})
export class SequencerComponent implements OnInit {

  public notes: Array<string>;
  public columns: Array<string>;
  constructor() {

    var keys = new Tone.Players({
              "A" : "./HA HA (NELSON).mp3",
              "C#" : "./HA HA (NELSON).mp3",
              "E" : "./HA HA (NELSON).mp3",
              "F#" : "./HA HA (NELSON).mp3",
              }, {
              "volume" : -10,
              "fadeOut" : "64n",
              }).toMaster();
    var noteNames = ["F#", "E", "C#", "A"];
    this.notes = ['C4','D4','E4','F4'];

    this.columns = ['00','01','02','03','04','05','06','07',
                    '08','09','10','11','12','13','14','15'];



   }

  ngOnInit() {
  }

  playSound(){
    console.log("in playSound");
  }

  toggleCell(event)
  {
    console.log('here in toggleCell ',event.target.attributes.id.textContent);

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

    console.log('id length is: ',id.length);

    console.log('x is: ',x,' y is: ',y,' note is: ',note);

    var cellValue = sequencerMatrix[x][y];

    if(cellValue == false)
    {
      document.getElementById(id).style.backgroundColor = "#faed27";

      seq.start();
    }
    else
    {
      document.getElementById(id).style.backgroundColor = "black";

      seq.stop();

    }

    sequencerMatrix[x][y] = !sequencerMatrix[x][y];

    console.log(sequencerMatrix[x][y]);






  }

}
