import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Outflow } from '../../../domain/outflow';
import { UserView } from '../../../domain/user-view';
import { AccountService } from '../../../services/account.service';
import { CustomAlertService } from '../../../services/custom-alert.service';
import { OutflowService } from '../../../services/outflow.service';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-outflow-detail',
  templateUrl: './outflow-detail.component.html',
  styleUrls: ['./outflow-detail.component.css']
})
export class OutflowDetailComponent implements OnInit {
  userRegister: UserView;
  userId: number;
  outflow: Outflow;
  @Output() updateOutflows = new EventEmitter<string>();

  constructor(private userService: UserService, private accountService: AccountService,
    private outflowService: OutflowService, private customAlertService: CustomAlertService) { }

  ngOnInit() {

  }

  getUser(id) {
    this.userService.getById(id).subscribe(
      result => {
        console.log(result);
        this.userRegister = result;
      },
      error => console.error(error)
    );
  }

  getOutflow(id) {
    this.outflowService.getOutflowById(id).subscribe(
      result => {
        console.log(result);
        this.outflow = result;
        console.log(this.outflow.userId);
        this.getUser(this.outflow.userId);
      },
      error => console.error(error)
    )
  }

  modalClick() {
    document.getElementById('modal-outflow-detail').click();
  }

  modalClose() {
    document.getElementById('button-close-modal').click();
  }

  delete(id) {
    this.customAlertService.displayAlert("Gestión de Egresos", ["¿Está seguro que desea eliminar este egreso?"], () => {
      this.outflowService.deleteOutflow(id).subscribe(
        result => {
          console.log(result);
          this.updateOutflowCash();
          this.modalClose();
        },
        error => {
          console.error(error);
          this.customAlertService.displayAlert("Gestión de Egresos", ["Error al intentar eliminar el egreso."])
        })
    }, true)
  }

  updateOutflowCash() {
    this.updateOutflows.emit();
  }
}
