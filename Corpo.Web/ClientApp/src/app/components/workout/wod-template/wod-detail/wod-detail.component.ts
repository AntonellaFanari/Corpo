import { Component, Input, OnInit } from '@angular/core';
import { Wod } from 'src/app/domain/wod';

@Component({
  selector: 'app-wod-detail',
  templateUrl: './wod-detail.component.html',
  styleUrls: ['./wod-detail.component.css']
})
export class WodDetailComponent implements OnInit {


  @Input() wod: Wod;
  @Input() date: string;
  constructor() { }

  ngOnInit() {
  }

}
