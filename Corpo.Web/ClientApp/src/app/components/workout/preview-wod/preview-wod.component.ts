import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { Wod } from '../../../domain/wod';

@Component({
  selector: 'app-preview-wod',
  templateUrl: './preview-wod.component.html',
  styleUrls: ['./preview-wod.component.css']
})
export class PreviewWodComponent implements OnInit {

  constructor() { }

  @Input() wod: Wod;
  @Input() weekNumber: number;

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges) {
    console.log("wod recibido vista previa: ", this.wod);
  }

  getGoals(goals) {
    return goals.split("-");
  }

}
