import { Injectable } from '@angular/core';

import {SamplerComponent} from './sampler.component';

@Injectable({
  providedIn: 'root'
})
export class SamplerService {

  constructor(private Samp:SamplerComponent) { }

  loadPads(padArray)
  {
    this.Samp.loadPads(padArray);
  }

  audioClicked(evt)
  {
    this.Samp.setClicked(evt);
  }
}
