import { Component, OnInit, Injectable, ApplicationRef, ChangeDetectionStrategy } from '@angular/core';

import {FirebaseService} from '../firebase/firebase.service';

import { Observable } from 'rxjs';

import { WaveformComponent } from '../waveform/waveform.component';

import { SamplerComponent } from '../sampler/sampler.component';

import { SequencerComponent } from '../sequencer/sequencer.component';

import { AudioBufferToWav } from '../../../audiobuffer-to-wav';

import { map } from 'rxjs/operators';

import{FSequencer} from '../files/f-sequencer.model';

import{AudioFile} from '../files/audio-file.model';

import {UserService} from '../user/user.service';

import {SequencerService} from '../sequencer/sequencer.service';

import {SamplerService} from '../sampler/sampler.service';


import {AngularFirestore } from '@angular/fire/firestore';

import {AngularFireStorageModule, StorageBucket} from '@angular/fire/storage';

import { AngularFireStorage } from '@angular/fire/storage';
//


////// need to add logic to make sure that the user cannot re-click to keep adding to the list.

var waveformComponent = new WaveformComponent;
var samplerComponent = new SamplerComponent;
var sequencerComponent = new SequencerComponent;


@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
@Injectable()
export class ListComponent implements OnInit {


  wavebuffer: any;

  clickedItem: any;


  public userFiles: Array<FSequencer>;

  public recList: Array<FSequencer>;

  //public userFiles: Array<string>;

  private defaultAudio:Array<string>;

  private cuts:Array<any>;


  private loaded:Array<any>;

  private path = "./../../assets/AudioSample/";

  public profileUrl: Observable<string | null>;

  constructor(private firebaseService?: FirebaseService,
              public appRef?: ApplicationRef,
              public user?: UserService,
              private firestore?: AngularFirestore,
              private samp?: SamplerService,
              private seq?: SequencerService) {

                this.defaultAudio=[];
                this.loaded=[];
                this.cuts=[];
                this.userFiles=[];
                this.defaultAudio = [
                  'das-ding_synth-18_synths_one_shot_114.wav.wav',
'das-ding_woodblock-2_drums_one_shot_114.wav.wav',
'analog-bell_E_minor.wav',
'high hats.wav',
'CHORD-FisherMan.wav',
'das-ding_bass-synth-26_synths_one_shot_114.wav.wav',
'devonté-hynes_synth-chord-3_synths_one_shot_.wav.wav',
'cam-bass.wav',
'.DS_Store',
'cam-snare.wav',
'kick ride.wav',
'SD-ER1-DigitalClaptrap2.wav',
'kick cymbal.wav',
'kick 5.wav',
'kick 4.wav',
'world-music_pantheon-steel-halo-low-e_pitched-percussion_one_shot_.wav.wav',
'kick 6.wav',
'cam-kick.wav',
'kick 7.wav',
'Pad-Caboverdullium.wav',
'cam-clap.wav',
'kick 3.wav',
'kick 2.wav',
'SD-ER1-ClappishSnare1.wav',
'qubit-electronix_8-bit-synth-31_synths_one_shot_.wav',
'qubit-electronix_analogue-82_synths_one_shot_.wav.wav',
'machinedrum_juno-8_synths_one_shot_.wav.wav',
'snare-12.wav',
'das-ding_full-synth-2_synths_one_shot_114.wav.wav',
'devonté-hynes_synth-chord-4_synths_one_shot_.wav.wav',
'world-music_pantheon-steel-halo-f-sharp_pitched-percussion_one_shot_.wav.wav',
'world-music_pantheon-steel-halo-low-g_pitched-percussion_one_shot_.wav.wav',
'kick 9.wav',
'BD-ER1-908-uhhhhhhh.wav',
'kick 8.wav',
'world-music_pantheon-steel-halo-low-c_pitched-percussion_one_shot_.wav',
'HH-ER1-Beatbox.wav',
'kick snare.wav',
'crash hit 2.wav',
'CHORD-LochNessishSharper.wav',
'crash hit.wav',
'machinedrum_juno-22_synths_one_shot_.wav.wav',
'BD-ER1-GoaKickLongDecay.wav',
'kick-11.wav',
'HH-ER1-909open.wav',
'hat-02.wav',
'world-music_pantheon-steel-halo-g_pitched-percussion_one_shot_.wav.wav',
];
  var path = "./../../assets/audioSamples/"
  if(this.firestore != undefined){
  this.firestore.collection<FSequencer>('sequencerFiles').valueChanges()
  .subscribe(v => {
    for (var i = 0; i<v.length;i++)
    {

      console.log(v[i]);
      var temp = new FSequencer(v[i].fileName, v[i].owner, v[i].pattern, v[i].sounds);
      this.userFiles.push(temp);
    }
  });
}
  console.log(this.userFiles);
  //this.userFiles.push('ass');
  //console.log('list comp const defaultFile',this.defaultFile);
  // console.log('list comp const userFiles 0.fielName: ',this.userFiles[0].fileName);
  // console.log('list comp const userFiles 0 type: ',typeof this.userFiles[0].fileName);

  // appRef.isStable.pipe(
  //    filter(stable => stable)
  // ).subscribe(() => console.log('App is stable now'));
  // interval(1000).subscribe(counter => console.log(counter));
  if(this.user != undefined){

  if(this.user.getLoggedInName() != null)
  {
    console.log('user is logged in');
  }
}
  else{
    console.log('no user logged in');
  }

 }
 getWaveBuffer(){
  //create object to convert buffer to wav
  var toWav = AudioBufferToWav;
  //calls the waveform component to get the audiobuffer from the waveform region
  this.wavebuffer = waveformComponent.getBuffer();
  console.log("IN SAMPLER", this.wavebuffer);



  // var ffmpeg = require('ffmpeg');
  // try{
  //   var process = new ffmpeg(this.wavebuffer);
  //   process.then(function (audio){
  //     audio.fnExtractSoundToMP3('../../assets/audioSamples/wavebuffer.mp3'), function (error, file) {
  //       if(!error)
  //         console.log('Audio file:' + file);

  //     });
  //   }, function (err) {
  //       console.log('error' + err);
  //   });
  //   }
  //   catch(e) {
  //     console.log(e.code);
  //     console.log(e.msg);
  //   }




 // var wav = toWav.audioBufferToWav(this.wavebuffer);

 //function to convert an audiobuffer to wav
 function bufferToWave(abuffer, len) {
  var numOfChan = abuffer.numberOfChannels,
      length = len * numOfChan * 2 + 44,
      buffer = new ArrayBuffer(length),
      view = new DataView(buffer),
      channels = [], i, sample,
      offset = 0,
      pos = 0;

  // write WAVE header
  setUint32(0x46464952);                         // "RIFF"
  setUint32(length - 8);                         // file length - 8
  setUint32(0x45564157);                         // "WAVE"

  setUint32(0x20746d66);                         // "fmt " chunk
  setUint32(16);                                 // length = 16
  setUint16(1);                                  // PCM (uncompressed)
  setUint16(numOfChan);
  setUint32(abuffer.sampleRate);
  setUint32(abuffer.sampleRate * 2 * numOfChan); // avg. bytes/sec
  setUint16(numOfChan * 2);                      // block-align
  setUint16(16);                                 // 16-bit (hardcoded in this demo)

  setUint32(0x61746164);                         // "data" - chunk
  setUint32(length - pos - 4);                   // chunk length

  // write interleaved data
  for(i = 0; i < abuffer.numberOfChannels; i++)
    channels.push(abuffer.getChannelData(i));

  while(pos < length) {
    for(i = 0; i < numOfChan; i++) {             // interleave channels
      sample = Math.max(-1, Math.min(1, channels[i][offset])); // clamp
      sample = (0.5 + sample < 0 ? sample * 32768 : sample * 32767)|0; // scale to 16-bit signed int
      view.setInt16(pos, sample, true);          // write 16-bit sample
      pos += 2;
    }
    offset++                                     // next source sample
  }

  // create Blob
  return new Blob([buffer], {type: "audio/wav"});


  function setUint16(data) {
    view.setUint16(pos, data, true);
    pos += 2;
  }

  function setUint32(data) {
    view.setUint32(pos, data, true);
    pos += 4;
  }
}
//~~~~~~~~~~~~~~~~ end audio buffer to wav function ~~~~~~~~~~~~~~~~~~~~~~~~~

  //call buffter to wav function to convert wavebuffer to wav
  var wav = bufferToWave(this.wavebuffer, this.wavebuffer.length);
  console.log("converted wav buffer", wav);


  var new_file = URL.createObjectURL(wav);
  console.log("in list:", new_file);

  //sampler.add('C3', new Tone.Buffer(new_file));
  this.cuts.push(new_file);


  //trying things here

  // var new_file = new File(wav,);
  // console.log("file", new_file);
  // new_file.Move("../../assets/audioSamples");


  //trying to store the new wav in the sampler's assets folder (think this is unsuccessful)

  //var myFile: any = this.blobToFile(wav, "./../../assets/audioSamples/wavaudio.wav")
  //this.sounds.push("./../../assets/audioSamples/wavaudio.wav");
  //console.log("file: ", myFile);


  //trying things here

  // var new_file = URL.createObjectURL(wav);
  // console.log("urlfile: ", new_file);
//   var reader = new FileReader();
//   reader.readAsDataURL(wav);
//   reader.onloadend = function() {
//       var base64data = reader.result;
//       console.log("This is converted: ", base64data);
//  }

}

//method to convert audio wav blob to a file
public blobToFile = (theBlob: Blob, fileName:string): File => {
  var b: any = theBlob;
  //A Blob() is almost a File() - it's just missing the two properties below which we will add
  b.lastModifiedDate = new Date();
  b.name = fileName;

  //Cast to a File() type
  return <File>theBlob;
}
listClick(clicked){
  console.log("you clicked a list", clicked);
  this.clickedItem = clicked;
  console.log("in listClicked", this.clickedItem)
  samplerComponent.getSound(this.clickedItem);
  sequencerComponent.assignSound(this.clickedItem);
}

public getClicked(){
  console.log("in getClicked", this.clickedItem);
  return this.clickedItem;
}

  ngOnInit() {

    this.firestore.collection<FSequencer>('sequencerFiles').valueChanges()
    .subscribe(v => {
      for (var i = 0; i<v.length;i++)
      {

        //console.log(v[i]);
        var temp = new FSequencer(v[i].fileName, v[i].owner, v[i].pattern, v[i].sounds);
        this.userFiles.push(temp);
      }
    });
  }

  addList(files)
  {
    return;
  }
  loadUserList()
  {

    this.firestore.collection<FSequencer>('sequencerFiles').valueChanges()
    .subscribe(v => {
      for (var i = 0; i<v.length;i++)
      {

        console.log(v[i]);
        var temp = new FSequencer(v[i].fileName, v[i].owner, v[i].pattern, v[i].sounds);
        this.userFiles.push(temp);
      }
    });
    console.log(this.userFiles);

  }

  newFile(obj)
  {

    this.userFiles.push(new FSequencer(obj.fileName,obj.owner,obj.pattern,obj.sounds)); // = [this.userFiles, temp];
    console.log('newFile print userFiles',this.userFiles)

  }
  loadDefaultList(){
    for(var i = 0; i<this.userFiles.length; i++)
    {

    }

  }

  displayItem(evt)
  {
    for(var i = 0; i<this.userFiles.length; i++)
    {
      if(this.userFiles[i].fileName == evt)
      {

        this.seq.loadSequencerMatrix(this.userFiles[i].pattern);
        this.samp.loadPads(this.userFiles[i].sounds);
      }
      else
      {

      }
    }
  }

  displayList()
  {
    for(var i = 0; i<this.userFiles.length; i++)
    {
      if(this.userFiles[i].fileName != null)
      {

      }
      else
      {

      }
    }
  }

  holdName(evt)
  {
    // console.log(typeof evt);
    // console.log(evt.path);
    console.log(this.path+evt);
    this.samp.audioClicked(this.path+evt);
  }
}
