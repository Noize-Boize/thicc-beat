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

//instruments
var ms = new Tone.MembraneSynth().toMaster();
var cy = new Tone.Synth().toMaster();
var hh = new Tone.Synth().toMaster();

//loops
Tone.Transport.bpm.value = 140;
var loopB = new Tone.Loop(kickF, "4n").start(0);
var loopC = new Tone.Loop(cymF, "16n").start(0);
var loopD = new Tone.Loop(hhF,"8n").start(0);

Tone.Transport.start();
Tone.Transport.stop();


//callback functions
function kickF(time){
  ms.triggerAttackRelease('c1','4n',time);
}
function cymF(time){
  cy.triggerAttackRelease('e2','16n',time);
}

function hhF(time){
  hh.triggerAttackRelease('b4','8n',time);
  hh.triggerAttackRelease('g4','8n',time);
}


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {

  onClick(){
    //var crusher = new Tone.BitCrusher(4).toMaster();
    //var reverb = new Tone.Freeverb().toMaster();
    //osc.start();

  }

  stopIt(){
    //osc.stop();


  }

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
      d.frequency.value = octave*eFreq;
      d.frequency.value = octave*fFreq;
      d.frequency.value = octave*gFreq;
      d.frequency.value = octave*aFreq;
      d.frequency.value = octave*bFreq;
    }

    octaveDown(){
      octave--;
      console.log("octave down");
      c.frequency.value = octave*cFreq;
      d.frequency.value = octave*dFreq;
      d.frequency.value = octave*eFreq;
      d.frequency.value = octave*fFreq;
      d.frequency.value = octave*gFreq;
      d.frequency.value = octave*aFreq;
      d.frequency.value = octave*bFreq;
    }

  }
