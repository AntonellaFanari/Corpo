import { Component, OnInit } from '@angular/core';
import { GeneralSetting } from '../../../domain/general-setting';
import { CustomAlertService } from '../../../services/custom-alert.service';
import { SettingsService } from '../../../services/settings.service';

@Component({
  selector: 'app-general-settings',
  templateUrl: './general-settings.component.html',
  styleUrls: ['./general-settings.component.css']
})
export class GeneralSettingsComponent implements OnInit {
  generalSettings: GeneralSetting[] = [];
  timeLimitCancell: number;
  maxNegative: number;
  firstDayPlan: boolean;
  requesting = false;
  constructor(private settingsService: SettingsService, private customAlertService: CustomAlertService) { }

  ngOnInit() {
    this.getAll();
  }

  getAll() {
    this.requesting = true;
    this.settingsService.getAll().subscribe(
      response => {
        console.log(response);
        this.generalSettings = response.result;
        for (var i = 0; i < this.generalSettings.length; i++) {
          let setting = this.generalSettings[i];
          if (setting.name == "timeLimitCancell") {
            if (setting.value == null) { this.timeLimitCancell = 0; } else { this.timeLimitCancell = parseInt(setting.value); }
          } if (setting.name == "maxNegative") {
            if (setting.value == null) { this.maxNegative = 0; } else { this.maxNegative = parseInt(setting.value); }
          } if (setting.name == "firstDayPlan") {
            if (setting.value == null) { this.firstDayPlan = false; } else { this.firstDayPlan = (setting.value == "true"); }
          }
          this.requesting = false;
        }
      },
      error => this.requesting = false
    )
  }

  modifySetting() {
    console.log(this.firstDayPlan);
    for (var i = 0; i < this.generalSettings.length; i++) {
      let setting = this.generalSettings[i];
      if (setting.name == "timeLimitCancell") {
        setting.value = this.timeLimitCancell.toString();
      } if (setting.name == "maxNegative") {
        setting.value = this.maxNegative.toString();
      } if (setting.name == "firstDayPlan") {
        setting.value = this.firstDayPlan.toString();
      }
    }
  }

  submit() {
    this.modifySetting();
    this.requesting = true;
    this.settingsService.update(this.generalSettings).subscribe(
      response => {
        console.log(response);
        this.customAlertService.displayAlert("Gestión de Configuraciones", ["Configuraciones guardadas."]);
        this.getAll();
      }, error => {
        console.error(error);
        this.requesting = false;
        if (error.status === 400) {
          this.customAlertService.displayAlert("Gestión de Configuraciones", error.error.errores);
        }
        if (error.status === 500) {
          this.customAlertService.displayAlert("Gestión de Configuraciones", ["Hubo un problema al intentar modificar las configuraciones."]);
        }
      })
  }
}
