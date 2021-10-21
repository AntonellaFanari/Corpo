import { Component, OnInit, ViewChild } from '@angular/core';
import { AdministratorFormComponent } from '../administrator-form/administrator-form.component';

@Component({
  selector: 'app-administrator-create',
  templateUrl: './administrator-create.component.html',
  styleUrls: ['./administrator-create.component.css']
})
export class AdministratorCreateComponent implements OnInit {
  @ViewChild(AdministratorFormComponent, { static: false }) formAdministrator: AdministratorFormComponent;

  constructor() { }

  ngOnInit() {
  }

  //submit() {
  //  var newAdministrator = this.formAdministrator.createAdministrator();
  //  console.log(newAdministrator);
  //  this.administratorService.add(newAdministrator);
  //}

}
