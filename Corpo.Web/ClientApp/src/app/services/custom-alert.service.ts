import { Injectable } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CustomAlertComponent } from '../components/custom-alert/custom-alert.component';

@Injectable({
  providedIn: 'root'
})

export class CustomAlertService {

  constructor(private modalService: NgbModal) { }

  displayAlert(title: string, messages: string[], thenFunction: any = null, displayCancel = false, cancelFunction: any = null) {
    console.log("display alert")
    const modalRef = this.modalService.open(CustomAlertComponent, { backdrop: "static", keyboard: false });
    modalRef.componentInstance.title = title;
    modalRef.componentInstance.messages = messages;
    modalRef.componentInstance.displayCancel = displayCancel;

    modalRef.result.then((result) => {
      console.log("")
      if (result) {
        modalRef.result.then(thenFunction);
      }
      else {
        modalRef.result.then(cancelFunction);
      }
    });
  }
}
