import { Injectable } from '@angular/core';

import {ListComponent} from './list.component';

@Injectable({
  providedIn: 'root'
})
export class ListService {



  constructor(public List:ListComponent) { }

  userLogin()
  {

    this.List.loadUserList()

  }

  loadList()
  {
    this.List.refreshList();
  }

  addToList(files)
  {
    this.List.addList(files);
  }
}
