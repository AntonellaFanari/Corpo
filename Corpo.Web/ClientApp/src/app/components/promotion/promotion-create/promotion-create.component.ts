import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PromotionAnotherMember } from '../../../domain/promotion-another-member';
import { Promotion } from '../../../domain/promotion';
import { CustomAlertService } from '../../../services/custom-alert.service';
import { PromotionService } from '../../../services/promotion.service';

@Component({
  selector: 'app-promotion-create',
  templateUrl: './promotion-create.component.html',
  styleUrls: ['./promotion-create.component.css']
})
export class PromotionCreateComponent implements OnInit {
  discount = 10;
  promotionAnotherMember: PromotionAnotherMember[] = [];
  formCreate: FormGroup;
  send: boolean = false;
 

  constructor(private formBuilder: FormBuilder, private dp: DatePipe, private promotionService: PromotionService,
    private customAlertService: CustomAlertService, private router: Router) {
    let from = this.dp.transform(new Date(), 'yyyy-MM-dd');
    console.log(from);
    let date = new Date();
    let to = this.dp.transform(date.setDate(date.getDate() + 31), 'yyyy-MM-dd');
    console.log(to);
    this.formCreate = this.formBuilder.group({
      name: ['', Validators.required],
      discountMainMember: ['', Validators.required],
      from: [from, Validators.required],
      to: [to, Validators.required]
    })
  }

  ngOnInit() {
  }

  get f() {
    return this.formCreate.controls;
  }

  addRow() {
    let discount = new PromotionAnotherMember();
    discount.discount = this.discount;
    this.promotionAnotherMember.push(discount);
    this.discount = 10;
  }

  removeRow(i) {
    this.promotionAnotherMember.splice(i, 1);
  }

  createPromotion() {
    let promotion = new Promotion();
    promotion.name = this.formCreate.value.name;
    promotion.discountMainMember = this.formCreate.value.discountMainMember;
    promotion.from = this.formCreate.value.from;
    promotion.to = this.formCreate.value.to;
    promotion.promotionAnotherMember = this.promotionAnotherMember;
    return promotion;
  }

  submit() {
    this.send = true;
    if (this.formCreate.valid) {
      let promotion = this.createPromotion();
      this.promotionService.add(promotion).subscribe(
        result => {
          console.log(result);
          this.router.navigate(['/promociones-list']);
        },
        error => {
          console.error(error);
          if (error.status === 400) {
            this.customAlertService.displayAlert("Gestión de Promociones", error.error.errores);
          }
          if (error.status === 500) {
            this.customAlertService.displayAlert("Gestión de Promociones", ["Hubo un problema al intentar crear la promoción."]);
          }
        })
    }
  }
}
