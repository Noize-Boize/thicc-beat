import { Component, OnInit } from '@angular/core';
import * as WaveSurfer from 'wavesurfer.js'
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

  constructor() {

   }

  ngOnInit() {
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
      //var path = "localhost:4200/"+file[0];
      var path = window.URL.createObjectURL(file[0]);
      loadedTrackPath = path;
      wavePlayer.load(path);
      //wavePlayer.load("./../../assets/audioSamples/HEY WHAT HAPPENED.mp3")
      //console.log(file[0].webkitRelativePath.concat(file[0].name));
      //console.log(path);
      console.log(path)
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



}
