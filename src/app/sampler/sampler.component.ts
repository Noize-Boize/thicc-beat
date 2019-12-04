import { Component, OnInit, Input } from '@angular/core';
import * as Tone from 'tone';
import * as Nexus from 'nexusui';
import { WaveformComponent } from '../waveform/waveform.component';
import { ChangeDetectorRef } from '@angular/core';
import { AudioBufferToWav } from '../../../audiobuffer-to-wav';
import { ListService } from '../list/list.service';




var clickedId: any;
var path = "./../../assets/audioSamples/"
var waveformComponent = new WaveformComponent;

//Sampler
var sampler = new Tone.Sampler({
  //call sampler.triggerAttack("note") to execute audio file associated w it
  //should be able to incorporate sharps so we have up to 12 triggerable audio files
	"C3" : "EVERYBODY PUT YOUR HANDS IN THE AIR.mp3",
  "D3" : "DOLPHIN.mp3",
  "E3" : "EPIC CHOIR SUSPENSE.mp3",
  "F3" : "RUBBER DUCK.mp3",
  "G3" : "SCREAM.mp3",
  "A3" : "SPLAT.mp3",
  "B3" : "TOASTY.mp3",
  "C4" : "RECORD SCRATCH.mp3",
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
  
  wavebuffer: any;
	public sounds: Array<string>;
	constructor(){



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

//this corresponds to the buffer button in the sampler
// getWaveBuffer(){
//   //create object to convert buffer to wav
//   var toWav = AudioBufferToWav;
//   //calls the waveform component to get the audiobuffer from the waveform region
//   this.wavebuffer = waveformComponent.getBuffer();
//   console.log("IN SAMPLER", this.wavebuffer);



//   // var ffmpeg = require('ffmpeg');
//   // try{
//   //   var process = new ffmpeg(this.wavebuffer);
//   //   process.then(function (audio){
//   //     audio.fnExtractSoundToMP3('../../assets/audioSamples/wavebuffer.mp3'), function (error, file) {
//   //       if(!error)
//   //         console.log('Audio file:' + file);
          
//   //     });
//   //   }, function (err) {
//   //       console.log('error' + err);
//   //   });
//   //   }
//   //   catch(e) {
//   //     console.log(e.code);
//   //     console.log(e.msg);
//   //   }
  



//  // var wav = toWav.audioBufferToWav(this.wavebuffer);
  
//  //function to convert an audiobuffer to wav
//  function bufferToWave(abuffer, len) {
//   var numOfChan = abuffer.numberOfChannels,
//       length = len * numOfChan * 2 + 44,
//       buffer = new ArrayBuffer(length),
//       view = new DataView(buffer),
//       channels = [], i, sample,
//       offset = 0,
//       pos = 0;

//   // write WAVE header
//   setUint32(0x46464952);                         // "RIFF"
//   setUint32(length - 8);                         // file length - 8
//   setUint32(0x45564157);                         // "WAVE"

//   setUint32(0x20746d66);                         // "fmt " chunk
//   setUint32(16);                                 // length = 16
//   setUint16(1);                                  // PCM (uncompressed)
//   setUint16(numOfChan);
//   setUint32(abuffer.sampleRate);
//   setUint32(abuffer.sampleRate * 2 * numOfChan); // avg. bytes/sec
//   setUint16(numOfChan * 2);                      // block-align
//   setUint16(16);                                 // 16-bit (hardcoded in this demo)

//   setUint32(0x61746164);                         // "data" - chunk
//   setUint32(length - pos - 4);                   // chunk length

//   // write interleaved data
//   for(i = 0; i < abuffer.numberOfChannels; i++)
//     channels.push(abuffer.getChannelData(i));

//   while(pos < length) {
//     for(i = 0; i < numOfChan; i++) {             // interleave channels
//       sample = Math.max(-1, Math.min(1, channels[i][offset])); // clamp
//       sample = (0.5 + sample < 0 ? sample * 32768 : sample * 32767)|0; // scale to 16-bit signed int
//       view.setInt16(pos, sample, true);          // write 16-bit sample
//       pos += 2;
//     }
//     offset++                                     // next source sample
//   }

//   // create Blob
//   return new Blob([buffer], {type: "audio/wav"});

//   function setUint16(data) {
//     view.setUint16(pos, data, true);
//     pos += 2;
//   }

//   function setUint32(data) {
//     view.setUint32(pos, data, true);
//     pos += 4;
//   }
// }
// //~~~~~~~~~~~~~~~~ end audio buffer to wav function ~~~~~~~~~~~~~~~~~~~~~~~~~

//   //call buffter to wav function to convert wavebuffer to wav
//   var wav = bufferToWave(this.wavebuffer, this.wavebuffer.length);
//   console.log("converted wav buffer", wav);


//   var new_file = URL.createObjectURL(wav);
//   console.log("URL:", new_file);

//   sampler.add('C3', new Tone.Buffer(new_file));


//   //trying things here

//   // var new_file = new File(wav,);
//   // console.log("file", new_file);
//   // new_file.Move("../../assets/audioSamples");
 
  
//   //trying to store the new wav in the sampler's assets folder (think this is unsuccessful)

//   //var myFile: any = this.blobToFile(wav, "./../../assets/audioSamples/wavaudio.wav")
//   //this.sounds.push("./../../assets/audioSamples/wavaudio.wav");
//   //console.log("file: ", myFile);
  

//   //trying things here

//   // var new_file = URL.createObjectURL(wav);
//   // console.log("urlfile: ", new_file);
// //   var reader = new FileReader();
// //   reader.readAsDataURL(wav); 
// //   reader.onloadend = function() {
// //       var base64data = reader.result;                
// //       console.log("This is converted: ", base64data);
// //  }
  
// }

// //method to convert audio wav blob to a file
// public blobToFile = (theBlob: Blob, fileName:string): File => {
//   var b: any = theBlob;
//   //A Blob() is almost a File() - it's just missing the two properties below which we will add
//   b.lastModifiedDate = new Date();
//   b.name = fileName;

//   //Cast to a File() type
//   return <File>theBlob;
// }

sendId(event){


	console.log("sendId "+clickedId);
	var target = event.target || event.srcElement || event.currentTarget;

	console.log(event.target.attributes.id.textContent);
	clickedId = target.attributes.id.textContent;

		//target.attributes.id.textContent);

}

getSound(sound){

	sampler.add(clickedId, new Tone.Buffer(sound));
}

getClickedSound(clickedSound){
  console.log("getClickedSound", clickedSound);
  sampler.add(clickedId, new Tone.Buffer(clickedSound));
  console.log("clickedID", clickedId);
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

clickCut(cut){
  sampler.add('C3', new Tone.Buffer(cut));
}

loadPads(padArray)
{

}

setClicked(evt){
	console.log('In Sampler, clicked audio file is',evt);
}



}
