import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-history-medical-form',
  templateUrl: './history-medical-form.component.html',
  styleUrls: ['./history-medical-form.component.css']
})
export class HistoryMedicalFormComponent implements OnInit {
  feminine: boolean = false;
  valueRadioButton: string;
  inputAllergies: boolean = false;
  inputHeartDisease: boolean = false;
  inputRespiratoryDisease: boolean = false;
  inputHabitualMedication: boolean = false;
  inputSurgicalIntervention: boolean = false;
  injury: boolean = false;
  formCreate: FormGroup;
  unamePattern = "^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d]{8,15}$";
  constructor(private formBuilder: FormBuilder) {
    this.formCreate = this.formBuilder.group({
      gender: ['', Validators.required],
      period: [''],
      weight: ['', Validators.required],
      allergies: '',
      heartDisease: '',
      respiratoryDisease: '',
      habitualMedication: '',
      surgicalIntervention: '',
      observations:'' 
    })
  }
  
  ngOnInit() {
  }

  selectGender(event) {
    console.log(event);
    if (event === 1) {
      this.feminine = false;
    } if (event === 2) {
      this.feminine = true;
    }
  }

  checkedAllergies(event) {
    console.log(this.inputAllergies);
    console.log(event);
    if (event == 1) {
      this.inputAllergies = true;
      console.log(this.inputAllergies);
    } if (event == 2) {
      this.inputAllergies = false
    }
  }

  checkedHeartDisease(event) {
    if (event == 1) {
      this.inputHeartDisease = true
    } if (event == 2) {
      this.inputHeartDisease = false
    }
  }

  checkedRespiratoryDisease(event) {
    if (event == 1) {
      this.inputRespiratoryDisease = true
    } if (event == 2) {
      this.inputRespiratoryDisease = false
    }
  }

  checkedHabitualMedication(event) {
    if (event == 1) {
      this.inputHabitualMedication = true
    } if (event == 2) {
      this.inputHabitualMedication = false
    }
  }

  checkedSurgicalIntervention(event) {
    if (event == 1) {
      this.inputSurgicalIntervention = true
    } if (event == 2) {
      this.inputSurgicalIntervention = false
    }
  }

  checkedInjury(event) {
    if (event == 1) {
      this.injury = true
    } if (event == 2) {
      this.injury = false
    }
  }

}
