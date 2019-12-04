import {File} from './file.model';

export class AudioFile extends File {
  path: string;
  fLength: string;
  tags:string[];

  constructor(fileName, owner, fLength, tags, path){
    super(fileName,owner);
    this.fLength = fLength;
    this.tags = tags;
    this.path = path
  }
}
