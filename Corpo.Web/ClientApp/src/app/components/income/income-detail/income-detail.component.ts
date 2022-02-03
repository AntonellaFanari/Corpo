import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Income } from '../../../domain/income';
import { UserView } from '../../../domain/user-view';
import { CustomAlertService } from '../../../services/custom-alert.service';
import { IncomeService } from '../../../services/income.service';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-income-detail',
  templateUrl: './income-detail.component.html',
  styleUrls: ['./income-detail.component.css']
})
export class IncomeDetailComponent implements OnInit {
  income: Income;
  userRegister: UserView;
  userId: number;
  @Output() updateIncome= new EventEmitter<string>();

  constructor(private incomeService: IncomeService, private userService: UserService, private customAlertService: CustomAlertService) {

  }

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

  getIncome(id) {
    this.incomeService.getById(id).subscribe(
      result => {
        console.log(result);
        this.income = result.result;
        this.getUser(this.income.userId);
      },
      error => console.error(error)
    )
  }

  modalClick() {
    document.getElementById('modal-income-detail').click();
  }

  modalClose() {
    document.getElementById('button-close-modal-income').click();
  }

  delete(id) {
    this.customAlertService.displayAlert("Gestión de Ingresos", ["¿Está seguro que desea eliminar este ingreso?"], () => {
      this.incomeService.delete(id).subscribe(
        result => {
          console.log(result);
          this.updateIncomeCash();
          this.modalClose();
        },
        error => {
          console.error(error);
          this.customAlertService.displayAlert("Gestión de Ingresos", ["Error al intentar eliminar el ingreso."])
        })
    }, true)
  }

  updateIncomeCash() {
    this.updateIncome.emit();
  }

}
