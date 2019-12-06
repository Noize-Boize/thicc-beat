import { Component, OnInit } from '@angular/core';

import * as Tone from 'tone';
import * as Nexus from 'nexusui'

Tone.Transport.start();

// 1D array with 16 columnss
var sequencerMatrix = new Array(4);

for(var i=0;i<4;i++){
  sequencerMatrix[i] = ['','','','','','','','','','','','','','','',''];
}

var sampler = new Tone.Sampler({
  "C4" : "kick-11.wav",
  "D4" : "snare-12.wav",
  "E4" : "hat-02.wav",
  "F4" : "analog-bell_E_minor.wav"

},{
  "baseUrl": "./../../assets/AudioSample/"
}).toMaster();
//

var seq = new Tone.Sequence(function(time, col)
{
  for(var i = 0;i<4;i++)
  {
    if(sequencerMatrix[i][col] != '')
    {
      sampler.triggerAttack(sequencerMatrix[i][col]);
    }
    console.log(col);
  }
},[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15], "16n");

@Component({
  selector: 'app-sequencer',
  templateUrl: './sequencer.component.html',
  styleUrls: ['./sequencer.component.css']
})


export class SequencerComponent implements OnInit {





  ngOnInit(){
    //Toggle button to play/pause sequencer
    var playButton = new Nexus.Button("#playButton", {'mode': 'toggle', 'state': false});
    playButton.colorize("accent","#ff0000");
    playButton.colorize("fill","#000");

    playButton.on('change', function(v) {
      if (seq.state=="stopped") {
        seq.start();
        console.log('play started');
      }
      else
      {
        seq.stop();
        console.log('play stopped');
      }
    });


    //Slider for BPM init
    var BpmSlider = new Nexus.Slider("#BpmSlider", {'min': 60, 'max': 240, 'step': 1});
    BpmSlider.colorize("accent","#000");
    BpmSlider.colorize("fill","#B19CD9");
    BpmSlider.value = 90;
    //assign slider to transport bpm
    BpmSlider.on('change', function(v) {Tone.Transport.bpm.value = v;});
    //text output of the current bpm inputted on slider
    var BpmNumDisplay= new Nexus.Number("#BpmNumDisplay");
    BpmNumDisplay.colorize("accent","#000");
    BpmNumDisplay.colorize("fill","#B19CD9");
    BpmNumDisplay.link(BpmSlider);

  }
  public notes: Array<string>;
  public columns: Array<string>;
  public clickedNote: any;
  public listSound: any;


  constructor()
  {
    this.notes = ['C4','D4','E4','F4'];

    this.columns = ['00','01','02','03','04','05','06','07',
                    '08','09','10','11','12','13','14','15'];

  }
  //play pause functionality implemented in nexusui oninit
  passNote(note){
    this.clickedNote = note;
    console.log("this is the note", this.clickedNote);
  }

  assignSound(sound){
    this.listSound = sound;
    console.log("in sequencer:", sound);
    //sampler.add(this.clickedNote, new Tone.Buffer(sound));
  }
  readySound(){
    console.log("sequencer clickedNote: ", this.clickedNote);
    console.log("sequencer listSound: ", this.listSound);
    sampler.add(this.clickedNote, new Tone.Buffer(this.listSound));
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


  toggleCell(event)
  {

    var id = event.target.attributes.id.textContent;
    var cellValue = sequencerMatrix[event.target.dataset.y][event.target.dataset.x];

    if(cellValue == '')
    {
      document.getElementById(id).style.backgroundColor = "#b300b3";
      sequencerMatrix[event.target.dataset.y][event.target.dataset.x] = event.target.dataset.note;
    }
    else
    {
      document.getElementById(id).style.backgroundColor = "black";
      sequencerMatrix[event.target.dataset.y][event.target.dataset.x] = ''
    }
  }

  seqBPM(){

  }

  load(matrix)
  {

    for (var i = 0;i < 4;i++)
    {
      for(var j = 0;j<16;j++)
      {
        var id=j+'_'+i;
        sequencerMatrix[i][j] = matrix[j+(i*16)];
        //console.log(id);
        if(sequencerMatrix[i][j]!=1)
        {
          document.getElementById(id).style.backgroundColor = "black";
          sequencerMatrix[i][j] = '';

        }
        else
        {
          document.getElementById(id).style.backgroundColor = "#faed27";
          sequencerMatrix[i][j] = this.notes[i];
        }
      }

    }
  }
  clearMatrix()
  {
    for (var i = 0;i < 4;i++)
    {
      for(var j = 0;j<16;j++)
      {
        sequencerMatrix[i][j] = '';
        document.getElementById(j+'_'+i).style.background = 'black';
      }

    }
  }
}
