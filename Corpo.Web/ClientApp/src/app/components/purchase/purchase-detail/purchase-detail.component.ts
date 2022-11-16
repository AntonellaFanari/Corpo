import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DetailPurchase } from '../../../domain/detail-purchase';
import { PurchaseService } from '../../../services/purchase.service';

@Component({
  selector: 'app-purchase-detail',
  templateUrl: './purchase-detail.component.html',
  styleUrls: ['./purchase-detail.component.css']
})
export class PurchaseDetailComponent implements OnInit {
  detailPurchase: DetailPurchase[] = [];
  id: number;
  requesting = false;

  constructor(private purchaseService: PurchaseService, private route: ActivatedRoute) {
    this.route.queryParams.subscribe(params => {
      this.id = parseInt(params['id'])
    });
  }

  ngOnInit() {
    this.getPurchase();
  }

  getPurchase() {
    this.requesting = true;
    this.purchaseService.getDetailPurchase(this.id).subscribe(
      result => {
        console.log(result);
        this.detailPurchase = result;
        this.requesting = false;
      },
      error => this.requesting = false
    )
  }

}
