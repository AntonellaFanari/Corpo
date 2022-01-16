import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { UserView } from '../../../domain/user-view';
import { Withdrawal } from '../../../domain/withdrawal';
import { AccountService } from '../../../services/account.service';
import { CustomAlertService } from '../../../services/custom-alert.service';
import { UserService } from '../../../services/user.service';
import { WithdrawalService } from '../../../services/withdrawal.service';

@Component({
  selector: 'app-withdrawal-detail',
  templateUrl: './withdrawal-detail.component.html',
  styleUrls: ['./withdrawal-detail.component.css']
})
export class WithdrawalDetailComponent implements OnInit {
  userRegisterWithdrawal: UserView;
  userId: number;
  withdrawal: Withdrawal;
  @Output() updateWithdrawal = new EventEmitter<string>();

  constructor(private userService: UserService, private accountService: AccountService,
    private withdrawalService: WithdrawalService, private customAlertService: CustomAlertService) {
    this.userId = this.accountService.getLoggedUser().id;
  }

  ngOnInit() {
    this.userService.getById(this.userId).subscribe(
      result => {
        console.log(result);
        this.userRegisterWithdrawal = result;
      },
      error => console.error(error)
    );

  }

  getWithdrawal(id) {
    this.withdrawalService.getWithdrawalById(id).subscribe(
      result => {
        console.log(result);
        this.withdrawal = result.result;
      },
      error => console.error(error)
    )
  }

  modalClick() {
    document.getElementById('modal-withdrawal-detail').click();
  }

  modalClose() {
    document.getElementById('button-close-modal-withdrawal').click();
  }

  delete(id) {
    this.customAlertService.displayAlert("Gestión de Retiros", ["¿Está seguro que desea eliminar este retiro?"], () => {
      this.withdrawalService.deleteWithdrawal(id).subscribe(
        result => {
          console.log(result);
          this.updateWithdrawalCash();
          this.modalClose();
        },
        error => {
          console.error(error);
          this.customAlertService.displayAlert("Gestión de Retiros", ["Error al intentar eliminar el retiro."])
        })
    }, true)
  }

  updateWithdrawalCash() {
    this.updateWithdrawal.emit();
  }

}
