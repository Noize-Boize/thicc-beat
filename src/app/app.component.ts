import { Component } from '@angular/core';
import * as Tone from 'tone';



//note frequencies
var cFreq = 262;
var dFreq = 293.66;
var eFreq = 329.63;
var fFreq = 349.23;
var gFreq = 392;
var aFreq = 440;
var bFreq = 493.88;

//what octave you're in
var octave = 1;

//source oscillators
var c = new Tone.FatOscillator(cFreq*octave,"sine").toMaster();
var d = new Tone.FatOscillator(dFreq*octave, "sine").toMaster();
var e = new Tone.FatOscillator(eFreq*octave, "sine").toMaster();
var f = new Tone.FatOscillator(fFreq*octave,"sine").toMaster();
var g = new Tone.FatOscillator(gFreq*octave, "sine").toMaster();
var a = new Tone.FatOscillator(aFreq*octave,"sine").toMaster();
var b = new Tone.FatOscillator(bFreq*octave, "sine").toMaster();

//some instruments
var ms = new Tone.MembraneSynth().toMaster();
var cy = new Tone.Synth().toMaster();
var hh = new Tone.Synth().toMaster();
var ps = new Tone.PluckSynth().toMaster();


//loops
//loop takes callback function to play over and over and a time. 4n is a quarter note
//call loopname.start(0); to start it immediately
var loopB = new Tone.Loop(kickF, "4n");
var loopC = new Tone.Loop(cymF, "16n");
var loopD = new Tone.Loop(hhF,"8n");
var loopK = new Tone.Loop(quadKick,"16n");

//callback functions
function kickF(time){
  ms.triggerAttackRelease('c1','4n',time);
}
function cymF(time){
  cy.triggerAttackRelease('e2','16n',time);
}
function hhF(time){
  //hh.triggerAttackRelease('b4','8n',time);
  hh.triggerAttackRelease('g4','8n',time);
}
function quadKick(time){
  ps.triggerAttackRelease('c4','16n',time);
}



//a testing function to play with
function argh(){
  Tone.Transport.start().scheduleRepeat(quadKick,"16n","0m","4n");

  //Tone.Transport.start();
  //loopK.start().stop('4n');
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})


export class AppComponent {

  //attached to the Test button for testing something quick
  startLoop(){
    argh();
  }

  //stop the Transport
  stopIt(){
    Tone.Transport.stop(0);
  }

  //play oscillator note
  playC(){
    c.start();
    setTimeout(function(){
    c.stop();},2000);
  }
  playD(){
    d.start();
    setTimeout(function(){
    d.stop();},2000);
  }
  playE(){
    e.start();
    setTimeout(function(){
    e.stop();},2000);
  }
  playF(){
      f.start();
      setTimeout(function(){
      f.stop();},2000);
    }
  playG(){
      g.start();
      setTimeout(function(){
      g.stop();},2000);
    }
  playA(){
      a.start();
      setTimeout(function(){
      a.stop();},2000);
    }
  playB(){
      b.start();
      setTimeout(function(){
      b.stop();},2000);
    }
  octaveUp(){
      octave++;
      console.log("octave up");
      c.frequency.value = octave*cFreq;
      d.frequency.value = octave*dFreq;
      e.frequency.value = octave*eFreq;
      f.frequency.value = octave*fFreq;
      g.frequency.value = octave*gFreq;
      a.frequency.value = octave*aFreq;
      b.frequency.value = octave*bFreq;
    }
  octaveDown(){
      octave--;
      console.log("octave down");
      c.frequency.value = octave*cFreq;
      d.frequency.value = octave*dFreq;
      e.frequency.value = octave*eFreq;
      f.frequency.value = octave*fFreq;
      g.frequency.value = octave*gFreq;
      a.frequency.value = octave*aFreq;
      b.frequency.value = octave*bFreq;
    }

  //log position of the transport
  logPosition(){
      console.log(Tone.Transport.position);
    }


  }
