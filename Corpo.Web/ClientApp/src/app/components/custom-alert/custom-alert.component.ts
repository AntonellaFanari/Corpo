import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-custom-alert',
  templateUrl: './custom-alert.component.html',
  styleUrls: ['./custom-alert.component.css']
})
export class CustomAlertComponent implements OnInit {

  @Input() title;
  @Input() messages;
  @Input() displayCancel;

  constructor(public activeModal: NgbActiveModal) { }

  ngOnInit() {
  }

}

