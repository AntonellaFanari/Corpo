import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Injury } from '../../../../domain/injury';

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
  upperLimbs: string[] = ["Cervical", "Hombro", "Brazo", "Codo", "Muñeca", "Manos", "Torso"];
  lowerLimbs: string[] = ["Cadera", "Pierna", "Rodilla", "Tibia", "Tobillo", "Pie"];
  optionsLimbs: boolean = true;
  files: Array<File> = [];
  urls = [];
  unamePattern = "^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d]{8,15}$";
  injuries: Injury[] = [];
  nameInjury: string;

  constructor(private formBuilder: FormBuilder) {
    this.formCreate = this.formBuilder.group({
      gender: ['0', Validators.required],
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
    this.feminine = (event == 2)
  }

  checkedAllergies(event) {
    this.inputAllergies = (event == 1);
  }

  checkedHeartDisease(event) {
    this.inputHeartDisease = (event == 1);
  }

  checkedRespiratoryDisease(event) {
    this.inputRespiratoryDisease = (event == 1);
  }

  checkedHabitualMedication(event) {
    this.inputHabitualMedication = (event == 1);
     
  }

  checkedSurgicalIntervention(event) {
    this.inputSurgicalIntervention = (event == 1);
  }

  checkedInjury(event) {
    this.injury = (event == 1);
     
  }

  selectLimb(event) {
    this.nameInjury = event;
  }

  checkedLimbs(event) {
    this.optionsLimbs=!this.optionsLimbs;
  }

  public onFileSelection(event: any): void {
    const files: FileList = event.target.files;
    this.files.splice(0, this.files.length);
    for (let i = 0; i < files.length; i++) {
      const file = <File>files.item(i);
      this.files.push(file);
      console.log(this.files);
    }

    this.urls = [];

    if (event.target.files && event.target.files[0]) {
      var filesAmount = event.target.files.length;
      for (let i = 0; i < filesAmount; i++) {
        var reader = new FileReader();

        reader.onload = (event: any) => {
          console.log(event.target.result);
          this.urls.push(event.target.result);
        }
        reader.readAsDataURL(event.target.files[i]);
      }
    }
  }

  addInjury() {
    var newInjury = new Injury();
    newInjury.name = this.nameInjury;
    newInjury.file=this.files;
  }

}
