import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Anamnesis } from '../../../domain/anamnesis/anamnesis';
import { AnamnesisService } from '../../../services/anamnesis.service';

@Component({
  selector: 'app-anamnesis-result',
  templateUrl: './anamnesis-result.component.html',
  styleUrls: ['./anamnesis-result.component.css']
})
export class AnamnesisResultComponent implements OnInit {
  resultAnamnesis: Anamnesis;
  id: number;
  requesting: boolean;

  constructor(private anamnesisService: AnamnesisService,
    private route: ActivatedRoute) {
    this.route.queryParams.subscribe(params => { this.id = parseInt(params['id']) });
    this.getAnamnesis();
  }

  ngOnInit() {
    
  }

  getAnamnesis() {
    this.requesting = true;
    this.anamnesisService.getByMemberId(this.id).subscribe(
      response => {
        this.requesting = false;
        console.log(response.result);
        this.resultAnamnesis = response.result;
      },
      error => {
        this.requesting = false;
        console.error(error)
      }
    )
  }
}
