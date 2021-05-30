import { Injectable } from '@angular/core';

import { Storage } from '@ionic/storage-angular';
import { from } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  private _storage: Storage | null = null;

  constructor(private readonly storage: Storage) {
    from(this.storage.create()).subscribe((storage) => {
      console.log("STORAGE SERVICE", storage);

      this._storage = storage
    });
  }

  public get(key: string): any {
    console.log("STORAGE SERVICE KEY", key);

    return this._storage.get(key);
  }

  public set(key: string, value: any): void {
    console.log("STORAGE SERVICE KEY/VALUE", key, value);

    this._storage?.set(key, value);
  }
}
