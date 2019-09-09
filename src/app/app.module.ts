import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SamplerComponent } from './sampler/sampler.component';
import { SequencerComponent } from './sequencer/sequencer.component';
import { WaveformComponent } from './waveform/waveform.component';


@NgModule({
  declarations: [
    AppComponent,
    SamplerComponent,
    SequencerComponent,
    WaveformComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
