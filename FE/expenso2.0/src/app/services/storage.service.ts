import { Injectable } from '@angular/core';

import { Storage } from '@ionic/storage-angular';
import { from, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  private _storage: Storage | null = null;

  constructor(private readonly storage: Storage) {
    from(this.storage.create()).subscribe((storage) => {
      this._storage = storage
    });
  }

  public get(key: string): Observable<any> {
    return from(this._storage.get(key));
  }

  public set(key: string, value: any): Observable<void> {
    return from(this._storage?.set(key, value));
  }
}
