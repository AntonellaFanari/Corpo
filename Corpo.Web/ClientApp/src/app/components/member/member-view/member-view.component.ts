import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FileInjury } from '../../../domain/file';
import { Injury } from '../../../domain/injury';
import { MedicalHistory } from '../../../domain/medical-history';
import { MemberView } from '../../../domain/member-view';
import { PhysicalLevel } from '../../../domain/wod/physical-level';
import { MemberService } from '../../../services/member.service';
@Component({
  selector: 'app-member-view',
  templateUrl: './member-view.component.html',
  styleUrls: ['./member-view.component.css']
})
export class MemberViewComponent implements OnInit {
  role: string;
  member: MemberView;
  medicalHistory: MedicalHistory;
  age: number;
  injuries = [];
  injuryFiles: FileInjury[] = [];
  medicalHistoryId: number;
  @Input() id: number;
  @Input() hideGoBack: boolean;
  requestingList: boolean;
  level: number;
  displayLevelsHistory: boolean;
  physicalLevelsHistory: PhysicalLevel[] = [];

  constructor(private memberService: MemberService, private route: ActivatedRoute) {
    this.route.queryParams.subscribe(params => {
      this.id = parseInt(params['id'])
    });
  }

  ngOnInit() {
    this.requestingList = true;
    this.getMember();
  }

  getMember() {
    this.memberService.getById(this.id).subscribe(
      result => {
        this.requestingList = false;
        this.member = result;
        this.getMedicalHistory();
        this.getAge();
        this.getLevel();
      },
      error => this.requestingList = false
    );
  }

  getLevel() {
    this.memberService.getLevel(this.id).subscribe(
      response => {
        console.log("nivel fisico: ", response.result.level);
        this.level = response.result.level;
      },
      error => console.error(error)
    )
  }

  getLevelsHistory() {
    this.memberService.getLevelsHistory(this.id).subscribe(
      response => {
        console.log("historial: ", response.result);
        this.physicalLevelsHistory = response.result;
        this.displayLevelsHistory = true;
      },
      error => console.error(error)
    )
  }

  hideLevelsHistory() {
    this.displayLevelsHistory = false;
  }

  getMedicalHistory() {
    this.memberService.getMedicalHistoryByIdMember(this.id).subscribe(
      result => {
        this.medicalHistory = result.result;
        console.log(this.medicalHistory);
        this.medicalHistoryId = this.medicalHistory.id;
        for (const property in this.medicalHistory) {
          if (this.medicalHistory[property] == null) {
            this.medicalHistory[property] = "-";
          } if (this.medicalHistory[property] == 'man') {
            this.medicalHistory[property] = 'Hombre';
          } if (this.medicalHistory[property] == 'woman') {
            this.medicalHistory[property] = 'Mujer';
          }
        };
        this.getAllInjuries(this.medicalHistoryId);
      },
      error => {
        if (error.status == 400) {
          console.log(this.medicalHistory);
          this.medicalHistory = null;
          console.log(this.medicalHistory);
        }
      }
    );
  }

  getAge() {
    this.memberService.getAge(this.id).subscribe(
      result => {
        console.log(result.result.age);
        this.age = result.result.age;
      },
      error => console.error(error)
    );
  }

  getAllInjuries(id) {
    this.injuryFiles = [];
    this.memberService.getAllInjuries(this.medicalHistoryId).subscribe(
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
      },
      error => console.error(error)
    );
  }

  selectInjury(event) {
    console.log(event);
    if (event == "all") {
      this.getAllInjuries(this.medicalHistoryId);
    } else {
      this.injuryFiles = this.injuries[event].files;
    }

  }

  getPath(path) {
    console.log("http://antofanari-001-site1.gtempurl.com/" + path);
    return "http://antofanari-001-site1.gtempurl.com/" + path;
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
}
