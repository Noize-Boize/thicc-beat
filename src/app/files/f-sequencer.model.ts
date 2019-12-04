import {File} from './file.model';


export class FSequencer extends File {

  // this is a string array for the
  // pattern in the sequencerMatrix
  pattern: string[];

  // this will be a string array of objects
  // the objects will be the audio files and their constituent information
  sounds : string[];


  constructor(fileName, owner, pattern, sounds){
    super(fileName,owner);
    this.pattern = pattern;
    this.sounds = sounds;

  }


  getPattern(){
    return this.pattern;
  }
}
