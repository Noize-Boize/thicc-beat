import { Component, OnInit } from '@angular/core';

import * as Tone from 'tone';

var wavePlayer = new Tone.Player("./../../assets/audioSamples/NOPE.mp3").toMaster();
var item = null;
var loadedTrackPath = "";

<<<<<<< HEAD

=======
>>>>>>> master



@Component({
  selector: 'app-waveform',
  templateUrl: './waveform.component.html',
  styleUrls: ['./waveform.component.css']
})


export class WaveformComponent implements OnInit {

  public loadedTracks: Array<string>;

  public trackSamples: Array<string>;

  constructor() {

    this.loadedTracks = ['track1','track2','track3','track4',];

    this.trackSamples = ['sample1','sample2','sample3',];

   }

  ngOnInit() {
    //document.getElementById("defaultOpen").click();
  }
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
<<<<<<< HEAD

      var path = window.URL.createObjectURL(file[0]);

      loadedTrackPath = path;

      wavePlayer.load(path);

      console.log(path);
=======
      //var path = "localhost:4200/"+file[0];
      var path = window.URL.createObjectURL(file[0]);
      loadedTrackPath = path;
      wavePlayer.load(path);
      //wavePlayer.load("./../../assets/audioSamples/HEY WHAT HAPPENED.mp3")
      //console.log(file[0].webkitRelativePath.concat(file[0].name));
      //console.log(path);
      console.log(path)
      //console.log("webkitRelativePath: "+file[0].webkitRelativePath)
>>>>>>> master

    }
    else{

      console.log("here in playTrack: null");

    }
  }

  playTrack(){
<<<<<<< HEAD

    if(loadedTrackPath == "")
    {

      console.log("Track is default")

      console.log(loadedTrackPath);

      wavePlayer.start();
    }
    else
    {

      wavePlayer.load(loadedTrackPath);

=======
    if(loadedTrackPath == window.URL)
    {
      console.log("Track is default")
      console.log(loadedTrackPath);
      wavePlayer.start();
    }
    else{
      wavePlayer.load(loadedTrackPath);
>>>>>>> master
      wavePlayer.start();

    }
  }

showList(evt, cityName) {
    var i, list, trackBox;
    list = document.getElementsByClassName("list");
    for (i = 0; i < list.length; i++) {
      list[i].style.display = "none";
    }
    trackBox = document.getElementsByClassName("trackBox");
    for (i = 0; i < trackBox.length; i++) {
      trackBox[i].className = trackBox[i].className.replace(" active", "");
    }
    document.getElementById(cityName).style.display = "block";
    evt.currentTarget.className += " active";
  }


  loadToWaveForm(track)
  {
    console.log(track);
  }
  applyToPad(sample){
    console.log(sample);
  }




}
