import { Injectable } from '@angular/core';

@Injectable()
export class LocalStorageService {

  constructor() { }

  public setLocalStorageId(id: string) {
    localStorage.setItem('id', id);
  }

  public getLocalStorageId() {
    return localStorage.getItem('id');
  }

  public clearStorage() {
    localStorage.clear();
  }
}
