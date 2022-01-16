import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PromotionAnotherMember } from '../../../domain/promotion-another-member';
import { Promotion } from '../../../domain/promotion';
import { CustomAlertService } from '../../../services/custom-alert.service';
import { PromotionService } from '../../../services/promotion.service';

@Component({
  selector: 'app-promotion-edit',
  templateUrl: './promotion-edit.component.html',
  styleUrls: ['./promotion-edit.component.css']
})
export class PromotionEditComponent implements OnInit {
  id: number;
  formEdit: FormGroup;
  promotion: Promotion;
  from: string;
  to: string;
  promotionAnotherMember: PromotionAnotherMember[] = [];
  discount = 10;
  send: boolean = false;

  constructor(private route: ActivatedRoute, private formBuilder: FormBuilder, private promotionService: PromotionService,
    private dp: DatePipe, private customAlertService: CustomAlertService, private router: Router) {
    this.route.queryParams.subscribe(params => { this.id = parseInt(params['id']) });
    this.formEdit = this.formBuilder.group({
      name: ['', Validators.required],
      discountMainMembers: ['', Validators.required],
      from: ['', Validators.required],
      to: ['', Validators.required]
    })
  }

  ngOnInit() {
    console.log(this.id);
    this.promotionService.getById(this.id).subscribe(
      result => {
        console.log(result);
        this.promotion = result.result;
        this.promotion.promotionAnotherMember = this.promotionAnotherMember;
        console.log(this.promotion);
        this.from = this.dp.transform(this.promotion.from, 'yyyy-MM-dd');
        this.to = this.dp.transform(this.promotion.to, 'yyyy-MM-dd');
        this.toCompleteForm(this.promotion);
      },
      error => console.error(error)
    )

  }

  toCompleteForm(promotion) {
    this.formEdit.patchValue({
      name: promotion.name,
      discountMainMembers: promotion.discountMainMember,
      from: this.from,
      to: this.to
    });
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

  get f() {
    return this.formEdit.controls;
  }

  editPromotion() {
    let promotion = new Promotion();
    promotion.name = this.formEdit.value.name;
    promotion.discountMainMember = this.formEdit.value.discountMainMember;
    promotion.from = this.formEdit.value.from;
    promotion.to = this.formEdit.value.to;
    promotion.promotionAnotherMember = this.promotionAnotherMember;
    return promotion;
  }

  submit() {
    this.send = true;
    if (this.formEdit.valid) {
      let promotion = this.editPromotion();
      this.promotionService.update(this.id, promotion).subscribe(
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
            this.customAlertService.displayAlert("Gestión de Promociones", ["Hubo un problema al intentar modificar la promoción."]);
          }
        })
    }
  }

}
