import { Component, OnInit } from '@angular/core';
import { WithdrawalName } from '../../../domain/withdrawal-name';
import { CustomAlertService } from '../../../services/custom-alert.service';
import { WithdrawalService } from '../../../services/withdrawal.service';

@Component({
  selector: 'app-withdrawal-name-list',
  templateUrl: './withdrawal-name-list.component.html',
  styleUrls: ['./withdrawal-name-list.component.css']
})
export class WithdrawalNameListComponent implements OnInit {

  filterName = "";
  withdrawalsName: WithdrawalName[] = [];
  requestingList: boolean;

  constructor(private withdrawalService: WithdrawalService, private customAlertService: CustomAlertService) { }

  ngOnInit() {
    this.requestingList = true;
    this.getAll();
  }

  getAll() {
    this.withdrawalService.getAllWithdrawalName().subscribe(
      result => {
        this.requestingList = false;
        this.withdrawalsName = result;
      },
      error => this.requestingList = false
    )
  }

  delete(id) {
    this.customAlertService.displayAlert("Gestión de Retiros", ["¿Está seguro que desea eliminar este retiro?"], () => {
      this.withdrawalService.deleteWithdrawalName(id).subscribe(
        result => {
          console.log(result);
          this.getAll();
        },
        error => {
          console.error(error);
          this.customAlertService.displayAlert("Gestión de Retiros", ["Error al intentar eliminar el retiro."])
        })
    }, true)
  }

}
