import { DatePipe } from '@angular/common';
import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { BalanceToPay } from '../../../domain/balance-to-pay';
import { Fee } from '../../../domain/fee';
import { FeeDto } from '../../../domain/fee-dto';
import { MemberPromotion } from '../../../domain/member-promotion';
import { MemberView } from '../../../domain/member-view';
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

@Component({
  selector: 'app-fee-promotion',
  templateUrl: './fee-promotion.component.html',
  styleUrls: ['./fee-promotion.component.css']
})
export class FeePromotionComponent implements OnInit {
  selectedPromotion: Promotion;
  promotionIdSelect = 0;
  promotions: Promotion[] = [];
  filterMember = "";
  member: MemberView;
  @ViewChild(DebtDetailComponent, { static: false }) debtDetailComponent: DebtDetailComponent;
  viewDebts: boolean = true;
  promotionAnotherMember: boolean = false;
  memberNum = 1;
  memberDiscount: number;
  percentagePromotion = [];
  fees: Fee[] = [];
  balances: BalanceToPay[] = [];
  viewAddedMembers: boolean = false;
  feeViewMemberPromotion: boolean = false;
  balanceViewMemberPromotion: boolean = false;
  membersPromotion: MemberPromotion[] = [];
  feeDto: FeeDto;
  members: MemberView[] = [];
  @Output() addMembersPromotion = new EventEmitter<MemberPromotion[]>();


  constructor(private memberService: MemberService, private planService: PlanService, private formBuilder: FormBuilder,
    private dp: DatePipe, private accountService: AccountService, private router: Router, private customAlertService: CustomAlertService,
    private balanceService: BalanceService, private feeService: FeeService, private promotionService: PromotionService,
    private creditService: CreditService ) {
 
  }

  ngOnInit() {
    this.memberService.getAll().subscribe(
      result => {
        this.members = result.result;
      },
      error => console.error(error));
    this.promotionService.getAll().subscribe(
      result => {
        console.log(result);
        this.promotions = result;
      },
      error => console.error(error)
    );
  }

  modalClick() {
    document.getElementById('modal-promotions').click();
  }

  selectPromotion(event) {
    this.promotionAnotherMember = false;
    console.log(event);
    this.selectedPromotion = this.promotions.find(x => x.id == event);
    console.log(this.selectedPromotion);
    if (this.selectedPromotion.promotionAnotherMember.length > 0) {
      this.promotionAnotherMember = true;
      this.filterMember = "";
      this.memberNum = 1;
      this.memberDiscount = this.selectedPromotion.promotionAnotherMember[0].discount;
      for (var i = 0; i < this.selectedPromotion.promotionAnotherMember.length; i++) {
        let percentage = this.selectedPromotion.promotionAnotherMember[i].discount;
        this.percentagePromotion.push(percentage);
      }
    }
    console.log(this.promotionIdSelect);
  }

  selectMember(event) {
    this.member = event;
    console.log(this.member);
    this.filterMember = this.member.lastName + " " + this.member.name;
    this.getFees(this.member.id);
    this.getBalances(this.member.id);
    this.feeViewMemberPromotion = true;
    this.balanceViewMemberPromotion = true;
  }

  getBalances(id) {
    this.balanceService.getAllByIdMember(id).subscribe(
      result => {
        console.log(result);
        this.balances = result;
      },
      error => console.error(error)
    )
  }

  getFees(id) {
    this.feeService.getAllByIdMember(id).subscribe(
      result => {
        console.log(result);
        this.fees = result;
      },
      error => console.error(error)
    )
  }


  addMemberPromotion(memberNum) {
    console.log(memberNum);
    console.log(this.percentagePromotion.length);
    this.viewAddedMembers = true;
    this.createMemberPromotion(memberNum);
    this.filterMember = "";
    this.feeViewMemberPromotion = false;
    this.balanceViewMemberPromotion = false;
    console.log(this.membersPromotion);
    if (this.memberNum == this.percentagePromotion.length) {
      this.promotionAnotherMember = false;
      this.feeViewMemberPromotion = false;
      this.balanceViewMemberPromotion = false;
    } if (this.memberNum < this.percentagePromotion.length && this.membersPromotion[this.memberNum]) {
      this.promotionAnotherMember = false;
      this.feeViewMemberPromotion = false;
      this.balanceViewMemberPromotion = false;
    } else {
      this.memberNum = this.memberNum + 1;
      this.memberDiscount = this.percentagePromotion[this.memberNum - 1];
    }

  }

  createMemberPromotion(memberNum) {
    let newMemberPromotion = new MemberPromotion();
    newMemberPromotion.id = this.selectedPromotion.id;
    newMemberPromotion.discount = this.percentagePromotion[memberNum - 1];
    newMemberPromotion.name = this.filterMember;
    newMemberPromotion.memberId = this.member.id;
    this.membersPromotion.splice((memberNum - 1), 0, newMemberPromotion);
    console.log(this.membersPromotion);
  }


  removeMemberPromotion(i) {
    this.membersPromotion.splice(i, 1);
    this.promotionAnotherMember = true;
    this.memberNum = i + 1;
    this.memberDiscount = this.percentagePromotion[i + 1];
  }

  addPromotion() {
    if (this.selectedPromotion != undefined) {
    /*  this.promotionView = true;*/
      console.log(this.selectedPromotion);
      this.feeDto = new FeeDto();
      this.feeDto.membersPromotion = this.membersPromotion;
      console.log(this.feeDto.membersPromotion);
      this.sendMembersPromotion();
    } else {
      this.customAlertService.displayAlert("Gestión de Cuotas", ["Debe seleccionar una promoción."], () => { this.openModalPromotions() })
    }

  }

    openModalPromotions() {
    this.promotionIdSelect = 0;
    this.promotionAnotherMember = false;
    this.feeViewMemberPromotion = false;
    this.balanceViewMemberPromotion = false;
    }

  sendMembersPromotion() {
    this.addMembersPromotion.emit(this.membersPromotion);
    this.modalClick();
  }
}
