import { Component, OnInit } from '@angular/core';
import * as Tone from 'tone';

var clickedId = "B5";
var path = "./../../assets/audioSamples/";

//Sampler
var sampler = new Tone.Sampler({
  //call sampler.triggerAttack("note") to execute audio file associated w it
  //should be able to incorporate sharps so we have up to 12 triggerable audio files
	"C3" : "EVERYBODY PUT YOUR HANDS IN THE AIR.mp3",
  "D3" : "DOLPHIN.mp3",
  "E3" : "FART.mp3",
  "F3" : "RUBBER DUCK.mp3",
  "G3" : "SCREAM.mp3",
  "A3" : "SPLAT.mp3",
  "B3" : "TOASTY.mp3",
  "C4" : "NOPE.mp3",
	"D4" : "HEY WHAT HAPPENED.mp3",
	"B5" : "NOPE.mp3", //This is a default for the global variable. please dont touch it.
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

	public sounds: Array<string>;
	constructor(){


	this.sounds = [
'FART.mp3',
'FAIL SOUND EFFECT.mp3',
'PUNCH.mp3',
'DRUM ROLL.mp3',
'DUN DUN DUNNN.mp3',
'LIGHTSABER.mp3',
'EXPLOSION.mp3',
'HEY WHAT HAPPENED.mp3',
'FALLING.mp3',
'FAIL.mp3',
'DENIED.mp3',
'TOASTY.mp3',
'MONSTER KILL.mp3',
'TO INFINITY AND BEYOND.mp3',
'ZACH GALIFIANAKIS LAUGH.mp3',
'EVIL LAUGH.mp3',
'RECORD SCRATCH #2.mp3',
'HA GAY.mp3',
'SAD MUSIC #2.mp3',
'LIGHTSABER #2.mp3',
'RECORD SCRATCH.mp3',
'HA HA (NELSON).mp3',
'EVERYBODY PUT YOUR HANDS IN THE AIR.mp3',
'INCEPTION FOG HORN.mp3',
'MGS ALERT.mp3',
'QUAD.mp3',
'YOU SUCK.mp3',
'NOPE.mp3',
'PUNCH #2.mp3',
'DING.mp3',
'SAD MUSIC.mp3',
'SWOOSH.mp3',
'FAIL #2.mp3',
'TOMAHAWK HITMARKER.mp3',
'I GOTTA BAD FEELING ABOUT THIS (HAN SOLO).mp3',
'VICTORY.mp3',
'DSR SLOW MO.mp3',
'RELOADING.mp3',
'ILLUMINATI.mp3',
'SWOOSH #3.mp3',
'WILHELM.mp3',
'SWOOSH #2.mp3',
'SPLAT.mp3',
'RUBBER DUCK.mp3',
'HEAVENLY CHOIR.mp3',
'SUSPENSE #1.mp3',
'SCREAM.mp3',
'SUDDEN SUSPENSE.mp3',
'THROWING KNIFE HITMARKER.mp3',
'SUSPENSE #2.mp3',
'SLIP.mp3',
'BOOM SWOOSH.mp3',
'GET OVER HERE.mp3',
'DOLPHIN.mp3',
'FUS RO DAH.mp3',
'EPIC CHOIR SUSPENSE.mp3',
'SAY WHAT.mp3',
'BOXING GLOVES BY JULIO KLADNIEW.mp3',
'BACKGROUNDMUSIC.mp3',
'THROWING.mp3',
];
}




  ngOnInit() {
  }

sendId(event){


	console.log("sendId "+clickedId);
	var target = event.target || event.srcElement || event.currentTarget;

	console.log(event.target.attributes.id.textContent);
	clickedId = target.attributes.id.textContent;

		//target.attributes.id.textContent);

}

getSound(sound){

	console.log(path+sound);
	sampler.add(clickedId, new Tone.Buffer(path+sound));
}

playSound(){
	console.log("playSound");
	sampler.triggerAttack(clickedId).toMaster();
}

//sampler effects
chorusON(){
	sampler.disconnect(Tone.Master);
  sampler.connect(chorus);
}
chorusOFF(){
	sampler.disconnect(chorus);
	sampler.connect(Tone.Master);
}
reverbON(){
  sampler.connect(reverb);
}
reverbOFF(){
	sampler.disconnect(reverb);
}
pitchON(){
  sampler.disconnect(Tone.Master);
  sampler.connect(pitch);
}
pitchOFF(){
	sampler.disconnect(pitch);
	sampler.connect(Tone.Master);
}

//background music
BGON(){
	player.start();
}
BGOFF(){
	player.stop();
}

//adjust playback rate



}
