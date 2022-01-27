import { Injectable } from '@angular/core';

@Injectable()
export class DebugService {

  constructor() { }

  info(message : string) : void {
    console.log(message);
  }
}
