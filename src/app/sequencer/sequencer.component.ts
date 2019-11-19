import { Component, OnInit } from '@angular/core';

import * as Tone from 'tone';

import * as Nexus from 'nexusui'

Tone.Transport.start();

var seqBPM = Tone.Transport.bpm;

// 1D array with 16 columnss
var sequencerMatrix = new Array(4);

for(var i=0;i<4;i++){
  sequencerMatrix[i] = ['','','','','','','','','','','','','','','',''];
}

var sampler = new Tone.Sampler({
  "C4" : "BD-ER1-908-uhhhhhhh.wav",
  "D4" : "HH-ER1-909open.wav",
  "E4" : "cam-clap.wav",
  "F4" : "cam-snare.wav"
},{
  "baseUrl": "./../../assets/CamAudioSample/"
}).toMaster();

var seq = new Tone.Sequence(function(time, col)
{
  for(var i = 0;i<4;i++)
  {
    if(sequencerMatrix[i][col] != '')
    {
      sampler.triggerAttack(sequencerMatrix[i][col]);
    }
  }
},[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15], "16n");


@Component({
  selector: 'app-sequencer',
  templateUrl: './sequencer.component.html',
  styleUrls: ['./sequencer.component.css']
})


export class SequencerComponent implements OnInit {

  ngOnInit()
  {
    var sliderBPM = new Nexus.Slider("#sliderBPM", {
      'size': [120,0], 'mode': 'relative', 'min': 60, 
      'max': 240, 'step': .5,'value': 80});

  }
  public notes: Array<string>;
  public columns: Array<string>;

  constructor()
  {
    this.notes = ['C4','D4','E4','F4'];

    this.columns = ['00','01','02','03','04','05','06','07',
                    '08','09','10','11','12','13','14','15'];
  }

  play(){
    if(seq.state=="stopped"){
      seq.start();
      console.log('play started');
    }
    else
    {
      seq.stop();
      console.log('play stopped');
    }
    return;
  }

  bpm(){

  }

  toggleCell(event)
  {

    var id = event.target.attributes.id.textContent;
    var cellValue = sequencerMatrix[event.target.dataset.y][event.target.dataset.x];

    if(cellValue == '')
    {
      document.getElementById(id).style.backgroundColor = "#faed27";
      sequencerMatrix[event.target.dataset.y][event.target.dataset.x] = event.target.dataset.note;
    }
    else
    {
      document.getElementById(id).style.backgroundColor = "black";
      sequencerMatrix[event.target.dataset.y][event.target.dataset.x] = ''
    }
  }
}
