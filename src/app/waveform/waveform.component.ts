import { Component, OnInit } from '@angular/core';
import * as WaveSurfer from 'wavesurfer.js';
import * as Tone from 'tone';
import RegionPlugin from 'wavesurfer.js/dist/plugin/wavesurfer.regions.min.js';
import TimelinePlugin from 'wavesurfer.js/dist/plugin/wavesurfer.timeline.min.js';

var wavePlayer = new Tone.Player("./../../assets/audioSamples/NOPE.mp3").toMaster();
var item = null;
var loadedTrackPath = "";
var counter = 0;




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
      progressColor: 'purple',
      plugins: [
        RegionPlugin.create(),
        TimelinePlugin.create({
          container:"#wave-timeline"
        })
        
      ]
    });
    if(counter>0){
      wavesurfer.destroy();
    }

  wavesurfer.load(loadedTrackPath);

  wavesurfer.on('ready', function () {
    wavesurfer.enableDragSelection({});
    wavesurfer.play();
});
wavesurfer.on('region-click', function() {
  console.log(Object.keys(wavesurfer.regions.list)[0]);
  wavesurfer.regions.list[Object.keys(wavesurfer.regions.list)[Object.keys(wavesurfer.regions.list).length-1]].playLoop();

});
wavesurfer.on('dblclick', function(){
  wavesurfer.play();
});
counter++;
  }

  loadFile(file){
    if (file != null){

      console.log("here in playTrack: not null")

      var path = window.URL.createObjectURL(file[0]);

      loadedTrackPath = path;

      wavePlayer.load(path);

      console.log(path);

    }
    else{

      console.log("here in playTrack: null");

    }
  }

  playTrack(){
    if(loadedTrackPath == "")
    {

      console.log("Track is default")

      console.log(loadedTrackPath);

      wavePlayer.start();
    }
    else
    {

      wavePlayer.load(loadedTrackPath);

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
