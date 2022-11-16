import { DatePipe } from '@angular/common';
import { ViewChild, ɵSWITCH_CHANGE_DETECTOR_REF_FACTORY__POST_R3__ } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CancelSale } from '../../../../domain/cancel-sale';
import { Cash } from '../../../../domain/cash';
import { DetailsSale } from '../../../../domain/details-sale';
import { RecordCash } from '../../../../domain/record-cash';
import { Sale } from '../../../../domain/sale';
import { CashService } from '../../../../services/cash.service';
import { CustomAlertService } from '../../../../services/custom-alert.service';
import { FeeService } from '../../../../services/fee.service';
import { IncomeService } from '../../../../services/income.service';
import { OutflowService } from '../../../../services/outflow.service';
import { ReportService } from '../../../../services/report.service';
import { SaleService } from '../../../../services/sale.service';
import { WithdrawalService } from '../../../../services/withdrawal.service';
import { BalancePaidService } from '../../../../services/balance-paid.service';
import { CancelBalancePaid } from '../../../../domain/cancel-balance-paid';
import { UserService } from '../../../../services/user.service';
import { UserView } from '../../../../domain/user-view';
import { BalancePaid } from '../../../../domain/balance-paid';
import { Status } from '../../../../domain/status';
import { PaymentDetailsComponent } from '../../../debt/payment-details/payment-details.component';

@Component({
  selector: 'app-cash-detail',
  templateUrl: './cash-detail.component.html',
  styleUrls: ['./cash-detail.component.css']
})
export class CashDetailComponent implements OnInit {
  cash: Cash;
  id: number;
  inflowsTotal: number;
  outflowsTotal: number;
  recordsCash: RecordCash[] = [];
  detailsSale: DetailsSale[] = [];
  sale: Sale;
  reasonCancel: string;
  currentDate: string;
  date: string;
  viewBtnReturn: boolean = false;
  requestingCash: boolean;
  requestingRecordsCash: boolean;
  balancePaidId: number;
  pay: number;
  userCancelSale: UserView;
  idUserCancel: number;
  cancelledSale: CancelSale;
  detailPay: BalancePaid;
  @ViewChild(PaymentDetailsComponent, { static: true }) payDetail: PaymentDetailsComponent;

  constructor(private cashService: CashService,
    private route: ActivatedRoute,
    private saleService: SaleService,
    private dp: DatePipe,
    private customAlertService: CustomAlertService,
    private feeService: FeeService,
    private outflowService: OutflowService,
    private incomeService: IncomeService,
    private withdrawalService: WithdrawalService,
    private reportService: ReportService,
    private balancePaidService: BalancePaidService,
    private userService: UserService) {
    this.route.queryParams.subscribe(params => {
      console.log(params['id']);
      this.id = parseInt(params['id']);
      this.date = this.dp.transform(new Date(), 'yyyy-MM-dd');
    })
  }

  ngOnInit() {

    console.log(this.id);
    if (isNaN(this.id)) {
      console.log(this.date);
      this.getCashDate();
    } else {
      this.viewBtnReturn = true;
      this.getCash();
    }

  }

  getCash() {
    this.requestingCash = true;
    this.cashService.getCashById(this.id).subscribe(
      result => {
        console.log(result.result);
        this.cash = result.result;
        this.getCashDetailed(this.cash.opening, this.cash.closing);
      },
      error => this.requestingCash = false
    )
  }

  getCashDate() {
    this.requestingCash = true;
    this.reportService.getCashDate(this.date).subscribe(
      result => {
        console.log(result.result);
        this.cash = result.result;
        this.getCashDetailed(this.cash.opening, this.cash.closing);
      },
      error => {
        this.requestingCash = false
        console.error(error);
        if (error.status == 400) {
          let cash = new Cash();
          cash.opening = this.date;
          cash.startingBalance = 0;
          cash.totalFee = 0;
          cash.totalSale = 0;
          cash.totalIncome = 0;
          cash.totalOutflow = 0;
          cash.totalWithdrawal = 0;
          cash.endingBalance = 0;
          this.cash = cash;
          this.calculateInflowsTotal();
          this.calculateOutflowsTotal();
        }
      }
    )
  }

  getCashDetailed(opening, closing) {
    this.reportService.getCashDetailed(opening, closing).subscribe(
      result => {
        console.log("operaciones: ", result);
        this.recordsCash = result.result;
        this.calculateInflowsTotal();
        this.calculateOutflowsTotal();
        this.requestingCash = false;
      },
      error => this.requestingCash = false
    )
  }

  calculateInflowsTotal() {
    this.inflowsTotal = this.cash.totalFee + this.cash.totalSale + this.cash.totalIncome;
  }

  calculateOutflowsTotal() {
    this.outflowsTotal = this.cash.totalOutflow + this.cash.totalWithdrawal;
  }

  getDetail(id, transaction) {
    if (transaction == "Venta") {
      this.modalDetailClick("modal-detail-sale");
      this.getDetailSale(id);
    } else {

      this.payDetail.modalClick(id, "report");
    }
  }

  modalDetailClick(modal) {
    document.getElementById(modal).click();

  }

  getDetailSale(id) {
    this.saleService.getSaleById(id).subscribe(
      result => {
        console.log(result);
        this.sale = result.result;
        this.detailsSale = this.sale.detailsSale;
        this.getCancelSale(id);
      },
      error => console.error(error)
    )
  }

  getDetailPay(id) {
    this.balancePaidService.getById(id).subscribe(
      response => {
        console.log("pago: ", response.result);
        this.detailPay = response.result;
        this.getUserCancel(this.detailPay.userId);
        this.date = this.detailPay.date;
        if (this.detailPay.pay < 0) { this.detailPay.pay *= (-1) }
      },
      error => console.error(error)
    )
  }

  delete(record) {
    switch (record.transaction) {
      case "Venta":
        this.getDetailSale(record.id);
        this.modalCancelClick("btn-modal-cancel");
        break;
      case "Cuota":
        this.deleteFee(record.id);
        break;
      case "Ingreso":
        this.deleteIncome(record.id);
        break;
      case "Egreso":
        this.deleteOutflow(record.id);
        break;
      case "Retiro":
        this.deleteWithdrawal(record.id);
        break;
      case "Pago":
        this.modalCancelClick("modal-cancel-pay");
        this.balancePaidId = record.id;
        this.pay = record.amount;
        break;
      default:
    }
  }

  createCancelSale(id) {
    var cancelSale = new CancelSale();
    cancelSale.date = this.currentDate;
    cancelSale.reason = this.reasonCancel;
    cancelSale.saleId = id;
    cancelSale.total = this.sale.total;
    return cancelSale;
  }

  modalCancelClick(modal) {
    document.getElementById(modal).click();
  }

  cancelSale() {
    this.customAlertService.displayAlert("Gestión de Ventas", ["¿Está seguro que desea anular esta venta?"], () => {
      var cancelSale = this.createCancelSale(this.sale.id);
      this.saleService.cancel(this.sale.id, cancelSale).subscribe(
        result => {
          this.modalCancelClick("btn-modal-cancel");
          this.getCashDetailed(this.cash.opening, this.cash.closing);
        },
        error => {
          console.error(error);
          this.customAlertService.displayAlert("Anulación", ["Error al intentar anular la venta."]);
        })
    }, true);
  }


  getCancelSale(saleId) {
    this.saleService.getCancelSale(saleId).subscribe(
      result => {
        console.log(result.result);
        this.cancelledSale = result.result;
        this.idUserCancel = result.result.userId;
        this.getUserCancel(this.idUserCancel);
      },
      error => console.error(error)
    )
  }


  getUserCancel(userId) {
    this.userService.getById(userId).subscribe(
      result => {
        console.log(result);
        this.userCancelSale = result;
      },
      error => console.error(error)
    );
  }

  deleteFee(id) {
    this.customAlertService.displayAlert("Gestión de Cuotas", ["¿Está seguro que desea eliminar esta cuota?"], () => {
      this.feeService.delete(id).subscribe(
        result => {
          console.log(result);
          this.getCashDetailed(this.cash.opening, this.cash.closing);
        },
        error => {
          console.error(error);
          this.customAlertService.displayAlert("Gestión de Cuotas", ["Error al intentar eliminar la cuota."])
        })
    }, true)
  }

  deleteIncome(id) {
    this.customAlertService.displayAlert("Gestión de Ingresos", ["¿Está seguro que desea eliminar este ingreso?"], () => {
      this.incomeService.delete(id).subscribe(
        result => {
          console.log(result);
          this.getCashDetailed(this.cash.opening, this.cash.closing);
        },
        error => {
          console.error(error);
          this.customAlertService.displayAlert("Gestión de Ingresos", ["Error al intentar eliminar el ingreso."])
        })
    }, true)
  }

  deleteOutflow(id) {
    this.customAlertService.displayAlert("Gestión de Egresos", ["¿Está seguro que desea eliminar este egreso?"], () => {
      this.outflowService.deleteOutflow(id).subscribe(
        result => {
          console.log(result);
          this.getCashDetailed(this.cash.opening, this.cash.closing);
        },
        error => {
          console.error(error);
          this.customAlertService.displayAlert("Gestión de Egresos", ["Error al intentar eliminar el egreso."])
        })
    }, true)
  }

  deleteWithdrawal(id) {
    this.customAlertService.displayAlert("Gestión de Retiros", ["¿Está seguro que desea eliminar este retiro?"], () => {
      this.withdrawalService.deleteWithdrawal(id).subscribe(
        result => {
          console.log(result);
          this.getCashDetailed(this.cash.opening, this.cash.closing);
        },
        error => {
          console.error(error);
          this.customAlertService.displayAlert("Gestión de Retiros", ["Error al intentar eliminar el retiro."])
        })
    }, true)
  }

  createCancelBalancePaid() {
    var cancelBalancePaid = new CancelBalancePaid();
    cancelBalancePaid.reason = this.reasonCancel;
    cancelBalancePaid.balancePaidId = this.balancePaidId;
    cancelBalancePaid.pay = this.pay;
    return cancelBalancePaid;
  }

  cancelPay() {
    this.customAlertService.displayAlert("Gestión de Pagos", ["¿Está seguro que desea cancelar este pago?"], () => {
      const cancelBalancePaid = this.createCancelBalancePaid();
      this.balancePaidService.cancel(this.balancePaidId, cancelBalancePaid).subscribe(
        result => {
          console.log(result);
          this.modalCancelClick("modal-cancel-pay");
          this.getCashDetailed(this.cash.opening, this.cash.closing);
        },
        error => {
          console.error(error);
          this.customAlertService.displayAlert("Gestión de Retiros", ["Error al intentar cancelar el pago."])
        })
    }, true)
  }
}
