import { Injectable } from '@angular/core';

import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  private _storage: Storage | null = null;

  constructor(private storage: Storage) {
  }

  public async init() {
    // If using, define drivers here: await this.storage.defineDriver(/*...*/);
    const storage = await this.storage.create();
    console.log('Init Storage');

    this._storage = storage;
  }

  public get(key: string): any {
    console.log('Get Storage key', key);

    return this._storage.get(key);
  }

  // Create and expose methods that users of this service can
  // call, for example:
  public set(key: string, value: any): void {
    console.log('Set Storage key', key, value);
    this._storage?.set(key, value);
  }
}
