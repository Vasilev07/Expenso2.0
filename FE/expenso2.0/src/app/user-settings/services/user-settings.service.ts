import { Injectable } from "@angular/core";
import { Subject } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UserSettingsService {
  public readonly settings: Subject<any> = new Subject<any>();
}
