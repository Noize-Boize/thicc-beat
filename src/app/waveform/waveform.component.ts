import { Component, Output, Injectable, OnInit } from '@angular/core';
import * as WaveSurfer from 'wavesurfer.js'
import * as Tone from 'tone';
import RegionPlugin from 'wavesurfer.js/dist/plugin/wavesurfer.regions.min.js';
import TimelinePlugin from 'wavesurfer.js/dist/plugin/wavesurfer.timeline.min.js';

var wavePlayer = new Tone.Player("./../../assets/audioSamples/NOPE.mp3").toMaster();
var item = null;
var loadedTrackPath = "";
var counter = 0;
var region1;
var wavesurfer;

export function copy(region, instance){
  var segmentDuration = region.end - region.start

  var originalBuffer = instance.backend.buffer;
  var emptySegment = instance.backend.ac.createBuffer(
      originalBuffer.numberOfChannels,
      segmentDuration * originalBuffer.sampleRate,
      originalBuffer.sampleRate
  );
  for (var i = 0; i < originalBuffer.numberOfChannels; i++) {
      var chanData = originalBuffer.getChannelData(i);
      var emptySegmentData = emptySegment.getChannelData(i);
      var mid_data = chanData.subarray( region.start * originalBuffer.sampleRate, region.end * originalBuffer.sampleRate);
      console.log("mid_data: ", mid_data);
      emptySegmentData.set(mid_data);
  }

  return emptySegment
}


@Component({
  selector: 'app-waveform',
  templateUrl: './waveform.component.html',
  styleUrls: ['./waveform.component.css'],
})

@Injectable()
export class WaveformComponent implements OnInit {
  buffer: any;
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
      wavesurfer = WaveSurfer.create({
      container: '#waveform',
      waveColor: '#b19cd9',
      progressColor: '#8D021F',
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
    wavesurfer.enableDragSelection({
      color: "rgba(179, 0, 179, .5)"
    });
    wavesurfer.play();
});
    wavesurfer.on('region-click', function() {
      region1 = wavesurfer.regions.list[Object.keys(wavesurfer.regions.list)[Object.keys(wavesurfer.regions.list).length-1]];
      region1.playLoop();

});
    wavesurfer.on('dblclick', function(){
    wavesurfer.play();
});
    counter++;
  }
  //this corresponds to the waveform copy button
copythis(){
  console.log("I made it to copythig()");
  this.buffer = copy(region1, wavesurfer);
  console.log(this.buffer);

}
destroyWaveform(){
  wavesurfer.destroy();
  counter--;
}
pauseWaveform(){
  wavesurfer.playPause();
}

getBuffer(){
  this.buffer = copy(region1, wavesurfer);
  console.log("in waveform getbuffer", this.buffer)
  return this.buffer;
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
