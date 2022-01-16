import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Fee } from '../../../domain/fee';
import { Member } from '../../../domain/member';
import { MemberView } from '../../../domain/member-view';
import { UserView } from '../../../domain/user-view';
import { CustomAlertService } from '../../../services/custom-alert.service';
import { FeeService } from '../../../services/fee.service';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-fee-detail',
  templateUrl: './fee-detail.component.html',
  styleUrls: ['./fee-detail.component.css']
})
export class FeeDetailComponent implements OnInit {
  fee: Fee;
  userRegister: UserView;
  @Output() updateFee = new EventEmitter<string>();
  member: MemberView;

  constructor(private feeService: FeeService, private userService: UserService, private customAlertService: CustomAlertService) { }

  ngOnInit() {
  }
  modalClick() {
    document.getElementById('modal-fee-detail').click();
  }

  getFee(id) {
    this.feeService.getById(id).subscribe(
      result => {
        console.log(result);
        this.fee = result;
        console.log("fee", this.fee);
        this.getUserRegister(this.fee.userId);
      },
      error => console.error(error)
    )
  }

  getUserRegister(id) {
    this.userService.getById(id).subscribe(
      result => {
        console.log(result);
        this.userRegister = result;
      },
      error => console.error(error)
    );
  }

  delete() {
    this.customAlertService.displayAlert("Gestión de Cuotas", ["¿Está seguro que desea eliminar esta cuota?"], () => {
      this.feeService.delete(this.fee.id).subscribe(
        result => {
          console.log(result);
          this.updateFeeCash();
        },
        error => {
          console.error(error);
          this.customAlertService.displayAlert("Gestión de Cuotas", ["Error al intentar eliminar la cuota."])
        })
    }, true)
  }

  updateFeeCash() {
    this.updateFee.emit();
  }
}
