import { DatePipe } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import fi from 'date-fns/locale/fi';
import { BalanceToPay, TransactionType } from '../../../domain/balance-to-pay';
import { Credit } from '../../../domain/credit';
import { Fee } from '../../../domain/fee';
import { FeeDto } from '../../../domain/fee-dto';
import { FeeView } from '../../../domain/fee-view';
import { MemberPromotion } from '../../../domain/member-promotion';
import { MemberView } from '../../../domain/member-view';
import { Plan } from '../../../domain/plan';
import { Promotion } from '../../../domain/promotion';
import { AccountService } from '../../../services/account.service';
import { BalanceService } from '../../../services/balance.service';
import { CreditService } from '../../../services/credit.service';
import { CustomAlertService } from '../../../services/custom-alert.service';
import { FeeService } from '../../../services/fee.service';
import { MemberService } from '../../../services/member.service';
import { PlanService } from '../../../services/plan.service';
import { PromotionService } from '../../../services/promotion.service';
import { DebtDetailComponent } from '../../debt/debt-detail/debt-detail.component';
import { FeePromotionComponent } from '../fee-promotion/fee-promotion.component';

@Component({
  selector: 'app-fee-create',
  templateUrl: './fee-create.component.html',
  styleUrls: ['./fee-create.component.css']
})
export class FeeCreateComponent implements OnInit {
  members: MemberView[] = [];
  plans: Plan[] = [];
  filterMember = "";
  plan: Plan;
  formCreate: FormGroup;
  total = 0;
  member: MemberView;
  send: boolean = false;
  pay = 0;
  credit: Credit;
  fees: Fee[] = [];
  promotionView: boolean = false;
  balances: BalanceToPay[] = [];
  @ViewChild(DebtDetailComponent, { static: false }) debtDetailComponent: DebtDetailComponent;
  viewDebts: boolean = true;
  feeViewMemberPromotion: boolean = false;
  balanceViewMemberPromotion: boolean = false;
  membersPromotion: MemberPromotion[] = [];
  selectedPromotion: Promotion;
  memberNum: number;
  memberDiscount: number;
  viewAddedMembers: boolean = false;
  feeDto: FeeDto;
  @ViewChild(FeePromotionComponent, { static: true }) promotionModal: FeePromotionComponent;

  constructor(private memberService: MemberService, private planService: PlanService, private formBuilder: FormBuilder,
    private dp: DatePipe, private accountService: AccountService, private router: Router, private customAlertService: CustomAlertService,
    private balanceService: BalanceService, private feeService: FeeService, private promotionService: PromotionService,
    private creditService: CreditService) {
    let from = this.dp.transform(new Date(), 'yyyy-MM-dd');
    let date = new Date();
    let to = this.dp.transform(date.setDate(date.getDate() + 31), 'yyyy-MM-dd');
    this.formCreate = this.formBuilder.group({
      memberId: ['', Validators.required],
      planId: ['', Validators.required],
      from: [from, Validators.required],
      to: [to, Validators.required],
      price: [0, Validators.required],
      promotion: 0,
    })
  }

  ngOnInit() {
    this.memberService.getAll().subscribe(
      result => {
        this.members = result;
      },
      error => console.error(error));
    this.planService.getAll().subscribe(
      result => {
        this.plans = result;
      },
      error => console.error(error)
    );
  }

  get f() {
    return this.formCreate.controls;
  }

  selectPlan(event) {
    this.plan = this.plans.find(x => x.id == event);
    this.formCreate.patchValue({
      planId: this.plan.id,
      price: this.plan.price,
      promotion: 0
    });
    this.total = this.formCreate.value.price - this.formCreate.value.promotion;
    this.pay = this.total;
  }


  calculateTotalFee() {
    this.total = this.formCreate.value.price - this.formCreate.value.promotion;
  }

  selectMember(event) {
    this.member = event;
    this.filterMember = this.member.lastName + " " + this.member.name;
    this.formCreate.patchValue({ memberId: this.member.id });
    this.selectPlan(this.member.planId);
    this.getFees(this.member.id);
    this.getBalances(this.member.id);
  }

  getBalances(id) {
    this.balanceService.getAllByIdMember(id).subscribe(
      result => {
        this.balances = result;
      },
      error => console.error(error)
    )
  }


  getFees(id) {
    this.feeService.getAllByIdMember(id).subscribe(
      result => {
        this.fees = result;
      },
      error => console.error(error)
    )
  }


  openModalPromotions() {
    this.promotionModal.modalClick();
  }

  deletePromotion() {
    this.promotionView = false;
    this.feeDto.membersPromotion = [];
    this.promotionModal.membersPromotion = [];
    this.formCreate.patchValue({
      price: this.plan.price,
      promotion: 0
    });
    this.pay = this.formCreate.value.price - this.formCreate.value.promotion;
    this.calculateTotalFee();
    this.pay = this.total;
  }

  createFeeDto() {
    if (this.feeDto == undefined) {
      this.feeDto = new FeeDto();
    };
    this.feeDto.memberId = this.member.id;
    this.feeDto.from = this.formCreate.value.from;
    this.feeDto.to = this.formCreate.value.to;
    this.feeDto.planName = this.plan.name;
    this.feeDto.credits = this.plan.credits;
    this.feeDto.creditId = this.member.creditId;
    this.feeDto.total = this.plan.price;
    this.feeDto.pay = this.pay;
    if (!this.feeDto.promotionId) {
      this.feeDto.promotionId = null;
      this.feeDto.totalPromotion = 0;
    } else {
      this.feeDto.totalPromotion = this.formCreate.value.promotion;
    };
    this.feeDto.initialCredit = this.plan.credits;
    this.feeDto.creditConsumption = 0;
    this.feeDto.negative = 0;
    this.feeDto.expiration = this.formCreate.value.to;
    this.feeDto.memberId = this.formCreate.value.memberId;
    this.feeDto.transaction = TransactionType.fee;
    this.feeDto.balance = this.calculateBalance();
  }


  calculateBalance() {
    return this.formCreate.value.price - this.pay;
  }

  clearInput() {
    this.filterMember = "";

  }

  //completeInput() {
  //  this.filterMember = this.member.lastName + " " + this.member.name;
  //  this.selectMember(this.member);
  //}

  submit() {
    this.send = true;
    if (this.formCreate.valid) {
      this.createFeeDto();
      this.feeService.add(this.feeDto).subscribe(
        result => {
          this.router.navigate(['/caja'])
        },
        error => {
          console.error(error);
          if (error.status === 400) {
            this.customAlertService.displayAlert("Gestión de Cuotas", error.error.errores);
          }
          if (error.status === 500) {
            this.customAlertService.displayAlert("Gestión de Cuotas", ["Hubo un problema al intentar cargar la cuota."]);
          }
        })
    }
  }

  getTransaction(balance) {
    this.debtDetailComponent.getTransaction(balance);
    this.debtDetailComponent.member = this.member;
    this.viewDebts = false;
    this.debtDetailComponent.viewDebts = true;
  }

  addMembersPromotionFee(event) {
    this.feeDto = new FeeDto();
    this.feeDto.membersPromotion = event;
    this.selectedPromotion = this.promotionModal.selectedPromotion;
    this.feeDto.promotionId = this.selectedPromotion.id;
    this.formCreate.patchValue({ promotion: this.formCreate.value.price * this.selectedPromotion.discountMainMember / 100 });
    this.promotionView = true;
    this.calculateTotalFee();
    this.pay = this.total;
  }
}
