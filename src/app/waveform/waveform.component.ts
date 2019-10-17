import { Component, OnInit } from '@angular/core';
<<<<<<< Updated upstream
=======
import * as WaveSurfer from 'wavesurfer.js';
import * as Tone from 'tone';


var wavePlayer = new Tone.Player("./../../assets/audioSamples/NOPE.mp3").toMaster();
var item = null;
var loadedTrackPath = "";



>>>>>>> Stashed changes

@Component({
  selector: 'app-waveform',
  templateUrl: './waveform.component.html',
  styleUrls: ['./waveform.component.css']
})
export class WaveformComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }
<<<<<<< Updated upstream
=======
  initWavesurfer(){
    var wavesurfer = WaveSurfer.create({
      container: '#waveform',
      waveColor: 'violet',
      progressColor: 'purple'
    });

  wavesurfer.load(loadedTrackPath);

  wavesurfer.on('ready', function () {
    wavesurfer.play();
});
  }

  loadFile(file){
    if (file != null){
      console.log("here in playTrack: not null")
      //var path = "localhost:4200/"+file[0];
      var path = window.URL.createObjectURL(file[0]);
      loadedTrackPath = path;
      wavePlayer.load(path);
      //wavePlayer.load("./../../assets/audioSamples/HEY WHAT HAPPENED.mp3")
      //console.log(file[0].webkitRelativePath.concat(file[0].name));
      //console.log(path);
      //console.log(path)
      //console.log("webkitRelativePath: "+file[0].webkitRelativePath)

    }
    else{
      console.log("here in playTrack: null")
    }
  }

  playTrack(){
    if(loadedTrackPath == "")
    {
      console.log("Track is default")
      console.log(loadedTrackPath);
      wavePlayer.start();
    }
    else{
      wavePlayer.load(loadedTrackPath);
      wavePlayer.start();
    }
  }


>>>>>>> Stashed changes

}
