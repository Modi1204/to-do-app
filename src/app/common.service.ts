import { EventEmitter, Injectable, Output } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CommonService {
  @Output() todoEdit: EventEmitter<any> = new EventEmitter();
  @Output() onToDoDataChange: EventEmitter<any> = new EventEmitter();
  constructor() {}
}
