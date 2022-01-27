import { Component, OnInit } from '@angular/core';
import { DebugService } from '../debug.service';

@Component({
  selector: 'app-debug',
  templateUrl: './debug.component.html',
  styleUrls: ['./debug.component.css']
})
export class DebugComponent implements OnInit {

  constructor(private debugservice : DebugService ) { }

  ngOnInit(): void {
    this.debugservice.info("Debug componant get service from parent");
  }

}
