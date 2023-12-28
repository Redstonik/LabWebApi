import { Injectable } from '@angular/core';
import { LocalStorageRefService } from './LocalStorageRef.service';
@Injectable({
providedIn: 'root'
})
export class StorageService {
private _localStorage: Storage;
constructor(private _localStorageRefService: LocalStorageRefService) {
this._localStorage = _localStorageRefService.localStorage
}
setItem(key: any, data: any){
this._localStorage.setItem(key, data);
}
getItem(key: any){
return this._localStorage.getItem(key);
}
removeItem(key: any){
this._localStorage.removeItem(key);
}
}