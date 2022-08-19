import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { parse } from 'date-fns';
import fi from 'date-fns/locale/fi/index.js';
import { Injury } from '../../../../domain/injury';
import { MedicalHistory } from '../../../../domain/medical-history';
import { Member } from '../../../../domain/member';
import { MemberService } from '../../../../services/member.service';

@Component({
  selector: 'app-medical-history-form',
  templateUrl: './medical-history-form.component.html',
  styleUrls: ['./medical-history-form.component.css']
})
export class MedicalHistoryFormComponent implements OnInit {
  feminine: boolean = false;
  valueRadioButton: string;
  inputAllergies: boolean = false;
  inputHeartDisease: boolean = false;
  inputRespiratoryDisease: boolean = false;
  inputHabitualMedication: boolean = false;
  inputSurgicalIntervention: boolean = false;
  formCreate: FormGroup;
  @Input()age: number;
  medicalHistory: MedicalHistory;
  sendForm: boolean = false;
  @Output() requesting = new EventEmitter();

  constructor(private formBuilder: FormBuilder, private memberService: MemberService) {
    this.formCreate = this.formBuilder.group({
      gender: ['', Validators.required],
      period: '',
      age: this.age,
      weight: ['', Validators.required],
      allergies: '',
      allergiesChecked:'no',
      heartDisease: '',
      heartDiseaseChecked: 'no',
      respiratoryDisease: '',
      respiratoryDiseaseChecked:'no',
      habitualMedication: '',
      habitualMedicationChecked: 'no',
      surgicalIntervention: '',
      surgicalInterventionChecked: 'no',
      observations:''
    })
  }
  
  ngOnInit() {
    this.formCreate.patchValue({
      age: this.age
    });
    this.formCreate.get('period').disable();
    this.formCreate.get('allergies').disable();
    this.formCreate.get('heartDisease').disable();
    this.formCreate.get('habitualMedication').disable();
    this.formCreate.get('respiratoryDisease').disable();
    this.formCreate.get('surgicalIntervention').disable();
  }
  get f() {

    return this.formCreate.controls;

  }

  selectGender(event) {
    if (event == 'woman') {
      this.formCreate.get('period').enable();
    } else {
      this.formCreate.get('period').disable();
    }
  }

  enableInput(event, name) {
    if (event == 'yes') {
      this.formCreate.get(name).enable();
    } else {
      this.formCreate.get(name).disable();
    }
  }

  createMedicalHistory() {
    this.sendForm = true;
    if (this.formCreate.valid) {
      var newMedicalHistory = new MedicalHistory();
      newMedicalHistory.gender = this.formCreate.value.gender;
      newMedicalHistory.period = this.formCreate.value.period;
      newMedicalHistory.weight = this.formCreate.value.weight;
      newMedicalHistory.allergies = this.formCreate.value.allergies;
      newMedicalHistory.heartDisease = this.formCreate.value.heartDisease;
      newMedicalHistory.respiratoryDisease = this.formCreate.value.respiratoryDisease;
      newMedicalHistory.habitualMedication = this.formCreate.value.habitualMedication;
      if (this.formCreate.value.observations == "") {
        newMedicalHistory.observations = undefined;
      } else {
        newMedicalHistory.observations = this.formCreate.value.observations
      };
      console.log(newMedicalHistory);
      return newMedicalHistory;
    }
  }


  getMedicalHistoryUpdate(id) {
    this.memberService.getMedicalHistoryByIdMember(id).subscribe(
      result => {
        this.medicalHistory = result.result;
        this.toCompleteForm();
        this.requesting.emit();
      },
      error => this.requesting.emit()
    )
  }

  toCompleteForm() {
    if (this.medicalHistory.gender == 'woman') this.formCreate.get('period').enable(); 
    if (this.medicalHistory.allergies != null) { this.formCreate.get('allergies').enable(); this.formCreate.patchValue({ allergiesChecked: 'yes' }) }
    if (this.medicalHistory.heartDisease != null) { this.formCreate.get('heartDisease').enable(); this.formCreate.patchValue({ heartDiseaseChecked: 'yes' }) }
    if (this.medicalHistory.habitualMedication != null) { this.formCreate.get('habitualMedication').enable(); this.formCreate.patchValue({ habitualMedicationChecked: 'yes' }) }
    if (this.medicalHistory.respiratoryDisease != null) { this.formCreate.get('respiratoryDisease').enable(); this.formCreate.patchValue({ respiratoryDiseaseChecked: 'yes'}) }
    if (this.medicalHistory.surgicalIntervention != null) { this.formCreate.get('surgicalIntervention').enable(); this.formCreate.patchValue({ surgicalInterventionChecked: 'yes' }) }
    this.formCreate.patchValue({
      gender: this.medicalHistory.gender,
      period: this.medicalHistory.period,
      age: this.age,
      weight: this.medicalHistory.weight,
      allergies: this.medicalHistory.allergies,
      heartDisease: this.medicalHistory.heartDisease,
      respiratoryDisease: this.medicalHistory.respiratoryDisease,
      habitualMedication: this.medicalHistory.habitualMedication,
      surgicalIntervention: this.medicalHistory.surgicalIntervention,
      observations: this.medicalHistory.observations
    });
    console.log(this.formCreate.value);
  }

}
