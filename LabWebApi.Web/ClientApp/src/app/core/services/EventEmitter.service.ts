import { EventEmitter, Injectable } from '@angular/core';
import { Subscription } from 'rxjs/internal/Subscription';
@Injectable({
providedIn: 'root'
})
export class EventEmitterService {

invokeComponentFunction = new EventEmitter()
subsVar: Subscription;
constructor() { }
onComponentInvoke() {
this.invokeComponentFunction.emit();
}
}