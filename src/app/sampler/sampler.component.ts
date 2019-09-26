import { Component, OnInit } from '@angular/core';
import * as Tone from 'tone';

//Sampler
var sampler = new Tone.Sampler({
  //call sampler.triggerAttack("note") to execute audio file associated w it
  //should be able to incorporate sharps so we have up to 12 triggerable audio files
	"C3" : "cam-BD-ER1-909iooo.wav",
  "D3" : "cam-Synth-BarbazoniaObservatory.wav",
  "E3" : "cam-CHORD-DreamhouzEvolve.wav",
  "F3" : "cam-BASS-1VCOmoogeysharper.wav",
  "G3" : "cam-SD-ER1-ClappishSnare1.wav",
  "A3" : "cam-BD-ER1-Stump.wav",
  "B3" : "TOASTY.mp3",
  "C4" : "NOPE.mp3",
	"D4" : "HEY WHAT HAPPENED.mp3",
},{
  //this is prepended to all the other paths
  "baseUrl": "./../../assets/audioSamples/"
}).toMaster();

//player for background music
var player = new Tone.Player("./../../assets/audioSamples/BACKGROUNDMUSIC.mp3").toMaster();
//sampler effects
var chorus = new Tone.Chorus(
{frequency : 4 ,
delayTime : 3.5 ,
depth : 5 ,
type : "sine" ,
spread : 200
}).toMaster();
var phaser = new Tone.Phaser().toMaster();
var reverb = new Tone.Reverb(
{decay : 3,
preDelay : 0.01
}).toMaster();
var pitch = new Tone.PitchShift(
{
pitch : -12 ,
windowSize : 0.1 ,
delayTime : 0 ,
feedback : 0,
wet: 1,
}
).toMaster();


@Component({
  selector: 'app-sampler',
  templateUrl: './sampler.component.html',
  styleUrls: ['./sampler.component.css']
})
export class SamplerComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
