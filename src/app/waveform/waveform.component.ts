import { Component, OnInit } from '@angular/core';

import * as Tone from 'tone';
import * as WaveSurfer from 'wavesurfer.js';


var wavePlayer = new Tone.Player("./../../assets/audioSamples/NOPE.mp3").toMaster();
var item = null;
var loadedTrack = document.getElementById("file");



@Component({
  selector: 'app-waveform',
  templateUrl: './waveform.component.html',
  styleUrls: ['./waveform.component.css']
})


export class WaveformComponent implements OnInit {

  constructor() {

   }

  ngOnInit() {
  }
  initWavesurfer(){
    var wavesurfer = WaveSurfer.create({
      container: '#waveform',
      waveColor: 'violet',
      progressColor: 'purple'
    });

  wavesurfer.load('../assets/test.mp3');

  wavesurfer.on('ready', function () {
    wavesurfer.play();
});
  }

  loadFile(file){
    if (file != null){
      console.log("here in playTrack: not null")
      var path = "./../../assets/audioSamples/"+file[0].name;
      wavePlayer.load(path);
      //wavePlayer.load("./../../assets/audioSamples/HEY WHAT HAPPENED.mp3")
      //console.log(file[0].webkitRelativePath.concat(file[0].name));
      console.log(path);
    }
    else{
      console.log("here in playTrack: null")
    }
  }

  playTrack(){
    if(loadedTrack == null)
    {
      console.log("Track is null")
      console.log(loadedTrack);
    }
    else{
      wavePlayer.load(loadedTrack);
      wavePlayer.start();
    }
  }



}
