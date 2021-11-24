import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Injury } from '../../../domain/injury';
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
  injuryFiles: File[];
  injuryId: number;
  memberId: number;

  constructor(private memberService: MemberService, private route: ActivatedRoute, private router: Router, private customAlertService: CustomAlertService) {
    this.route.queryParams.subscribe(params => {
      this.memberId = parseInt(params['id']),
        this.medicalHistoryId = parseInt(params['medicalHistoryId'])
    });
  }

  ngOnInit() {
    this.getAllInjuries(this.medicalHistoryId);
  }

  getAllInjuries(id: number) {
    this.injuryFiles = [];
    this.memberService.getAllInjuries(id).subscribe(
      result => {
        console.log(result);
        this.injuries = result;
        for (var i = 0; i < this.injuries.length; i++) {
          var files = this.injuries[i].files;
          for (var j = 0; j < files.length; j++) {
            this.injuryFiles.push(files[j]);
          }
        }
      },
      error => console.error(error)
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
    this.memberService.deleteFile(id).subscribe(
      result => {
        console.log(result);
        this.getAllInjuries(this.medicalHistoryId);
      },
      error => console.error(error)
    )
  }

  addInjury() {
    console.log("pase");
    var newInjury = new Injury();
    console.log(this.nameInjury);
    newInjury.name = this.nameInjury;
    newInjury.medicalHistoryId = this.medicalHistoryId;
    this.memberService.addInjury(newInjury).subscribe(
      result => {
        let id = result.result.id;
        this.memberService.addFile(id, this.files).subscribe(
          result => {
            console.log(result);
            this.getAllInjuries(this.medicalHistoryId);
          },
          error => {
            console.error(error);
            this.customAlertService.displayAlert("Gestión de antecedentes de lesiones", [error.error]);
          });
      },
      error => {
        console.error(error);
        this.customAlertService.displayAlert("Gestión de antecedentes de lesiones", [error.error])
      })
  }

  return() {
    this.router.navigate(['/historia-médica-editar'], { queryParams: { id: this.memberId, medicalHistoryId: this.medicalHistoryId } });
  }

  download(fileName) {
    this.memberService.download(fileName).subscribe(
      result => {
        console.log(result);
      },
      error => console.error(error)
    )
  }

}
