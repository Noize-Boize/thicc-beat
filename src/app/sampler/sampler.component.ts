import { Component, OnInit } from '@angular/core';
import * as Tone from 'tone';
import * as Nexus from 'nexusui';



var clickedId = "B5";
var path = "./../../assets/audioSamples/"

//Sampler
var sampler = new Tone.Sampler({
  //call sampler.triggerAttack("note") to execute audio file associated w it
  //should be able to incorporate sharps so we have up to 12 triggerable audio files
	"C3" : "cam-smpkick.wav",
  "D3" : "cam-smphat.wav",
  "E3" : "cam-smpblip1.wav",
  "F3" : "cam-smpblip2.wav",

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


	this.sounds = [];
}



  ngOnInit() {
		var playbackDial = new Nexus.Dial('#playbackDial',{
  'size': [40,40],
  'interaction': 'radial', // "radial", "vertical", or "horizontal"
  'mode': 'relative', // "absolute" or "relative"
  'min': 0,
  'max': 3,
  'step': 0.1,
  'value': 1
})
		var chorusSlider = new Nexus.Slider('#chorusSlider',{
    'size': [100,20],
    'mode': 'relative',  // 'relative' or 'absolute'
    'min': 0,
    'max': 100,
    'step': 1,
    'value': 0
})
		var reverbSlider = new Nexus.Slider('#reverbSlider',{
    'size': [100,20],
    'mode': 'relative',  // 'relative' or 'absolute'
    'min': 0,
    'max': 100,
    'step': 1,
    'value': 0
})
		var pitchSlider = new Nexus.Slider('#pitchSlider',{
    'size': [100,20],
    'mode': 'relative',  // 'relative' or 'absolute'
    'min': 0,
    'max': 100,
    'step': 1,
    'value': 0
})
		playbackDial.on('change',function(v) {
		  // v holds the new numeric value of the dial
			player.playbackRate = v;
		});
		chorusSlider.on('change',function(v){
			chorus.depth = v;
		});
		reverbSlider.on('change',function(v){
			reverb.decay = v;
		});
		pitchSlider.on('on',function(v){
			pitch.feedback =v;
		});
		

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

}
