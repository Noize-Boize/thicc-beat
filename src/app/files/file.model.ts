export class File {
  public id: string;

  public fileName: string;

  public owner: string;

  constructor(fileName,owner)
  {
    this.fileName = fileName;
    this.owner = owner;
  }

  getFileName(){
    return this.fileName;
  }

  public c()
    {
      console.log('here in c');
    }
  r()
    {
      console.log('here in r');
    }
  u()
    {
      console.log('here in u');
    }
  d()
    {
      console.log('here in d');
    }

}
