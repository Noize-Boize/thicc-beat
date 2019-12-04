import { Injectable } from '@angular/core';

import{SequencerComponent} from './sequencer.component';

@Injectable({
  providedIn: 'root'
})
export class SequencerService {

  constructor(public seq:SequencerComponent) { }

  loadSequencerMatrix(matrix)
  {
    console.log('seqService');
    this.seq.load(matrix);
  }
}
