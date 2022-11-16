import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FileInjury } from '../../../domain/file';
import { Injury } from '../../../domain/injury';
import { AccountService } from '../../../services/account.service';
import { CustomAlertService } from '../../../services/custom-alert.service';
import { MemberService } from '../../../services/member.service';

@Component({
  selector: 'app-injury-history',
  templateUrl: './injury-history.component.html',
  styleUrls: ['./injury-history.component.css']
})
export class InjuryHistoryComponent implements OnInit {
  injury: boolean = false;
  upperLimbs: string[] = ["Cervical", "Hombro", "Brazo", "Codo", "Muñeca", "Manos", "Torso"];
  lowerLimbs: string[] = ["Cadera", "Pierna", "Rodilla", "Tibia", "Tobillo", "Pie"];
  optionsLimbs: boolean = true;
  files: Array<File> = [];
  urls = [];
  injuries = [];
  nameInjury: string;
  medicalHistoryId: number;
  injuryFiles: FileInjury[];
  injuryId: number;
  memberId: number;
  userType: number;
  requesting = false;
  selectedFile = false;

  constructor(private accountService: AccountService, private memberService: MemberService, private route: ActivatedRoute, private router: Router, private customAlertService: CustomAlertService) {
    this.userType = this.accountService.getLoggedUser().userType;
    this.route.queryParams.subscribe(params => {
      this.memberId = parseInt(params['id']),
        this.medicalHistoryId = parseInt(params['medicalHistoryId'])
    });
  }

  ngOnInit() {
    this.getAllInjuries(this.medicalHistoryId);
  }

  getAllInjuries(id: number) {
    this.requesting = true;
    this.injuryFiles = [];
    this.memberService.getAllInjuries(id).subscribe(
      result => {
        console.log(result);
        this.injuries = result;
        for (var i = 0; i < this.injuries.length; i++) {
          var files = this.injuries[i].files;
          for (var j = 0; j < files.length; j++) {
            files[j].name = files[j].name.substr(0, 20);
            this.injuryFiles.push(files[j]);
          }
        }
        this.requesting = false;
      },
      error => this.requesting = false
    )
  }


  checkedInjury(event) {
    this.injury = (event == 1);

  }

  selectLimb(event) {
    this.nameInjury = event;
  }

  checkedLimbs(event) {
    this.optionsLimbs = !this.optionsLimbs;
    if (event == 1) {
      (<HTMLInputElement>document.getElementById("LowerLimb")).value = "";
    } else {
      (<HTMLInputElement>document.getElementById("UpperLimb")).value = "";
    }
  }

  public onFileSelection(event: any): void {
    const files: FileList = event.target.files;
    this.files.splice(0, this.files.length);
    for (let i = 0; i < files.length; i++) {
      const file = <File>files.item(i);
      this.files.push(file);
      this.selectedFile = true;
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
    console.log(this.urls);

  }

  selectInjury(event) {
    console.log(event);
    if (event == "all") {
      this.getAllInjuries(this.medicalHistoryId);
    } else {
      this.injuryFiles = this.injuries[event].files;
    }

  }

  deleteFile(id) {
    this.customAlertService.displayAlert("Gestión de Lesiones", ["¿Está seguro que desea eliminar esta lesión?"], () => {
      this.requesting = true;
      this.memberService.deleteFile(id).subscribe(
        result => {
          this.getAllInjuries(this.medicalHistoryId);
        },
        error => {
          this.requesting = false;
          console.error(error);
          this.customAlertService.displayAlert("Eliminación", ["Error al intentar eliminar la lesión."]);
        })
    }, true);
  }

  addInjury() {
    console.log("pase");
    var newInjury = new Injury();
    console.log(this.nameInjury);
    newInjury.name = this.nameInjury;
    newInjury.medicalHistoryId = this.medicalHistoryId;
    if (newInjury.name != undefined) {
      this.memberService.addInjury(newInjury).subscribe(
        result => {
          this.selectedFile = false;
          let id = result.result.id;
          this.memberService.addFile(id, this.files).subscribe(
            result => {
              console.log(result);
              this.getAllInjuries(this.medicalHistoryId);
            },
            error => {
              console.error(error);
              this.customAlertService.displayAlert("Gestión de antecedentes de lesiones", [error.error.errores]);
            });
        },
        error => {
          console.error(error);
          this.customAlertService.displayAlert("Gestión de antecedentes de lesiones", [error.error])
        })
    } else {
      this.customAlertService.displayAlert("Gestión de antecedentes de lesiones", ["Debe seleccionar una lesión."]);

    }

  }

  return() {
    this.router.navigate(['/historia-médica-editar'], { queryParams: { id: this.memberId, medicalHistoryId: this.medicalHistoryId } });
  }

  download(i) {
    console.log(i);
    console.log(this.injuryFiles[i]);
    let fileName = this.injuryFiles[i].path;
    console.log(fileName);
    this.memberService.download(fileName).subscribe(
      (response: any) => {
        let binaryData = [];
        binaryData.push(response);
        let downloadLink = document.createElement('a');
        downloadLink.href = window.URL.createObjectURL(new Blob(binaryData, {
          type: response.type
        }));
        if (fileName)
          downloadLink.setAttribute('download', fileName);
        document.body.appendChild(downloadLink);
        downloadLink.click();
      }
    )
  }

  submit() {
    if (this.userType == 1) {
      this.router.navigate(['/member-list']);
    } else {
      this.router.navigate(['/datos-personales'])
    }
  }



}
