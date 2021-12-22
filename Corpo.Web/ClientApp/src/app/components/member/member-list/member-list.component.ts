import { Component, OnInit } from '@angular/core';
import { MemberView } from '../../../domain/member-view';
import { CustomAlertService } from '../../../services/custom-alert.service';
import { MemberService } from '../../../services/member.service';

@Component({
  selector: 'app-member-list',
  templateUrl: './member-list.component.html',
  styleUrls: ['./member-list.component.css']
})
export class MemberListComponent implements OnInit {
  members: MemberView[] = [];
  filterMember = "";

  constructor(private memberService: MemberService, private customAlertService: CustomAlertService) { }

  ngOnInit() {
    this.getAll();
  }

  getAll() {
    this.memberService.getAll().subscribe(
      (result) => {
        console.log(result);
        this.members = result;
      },
      error => console.error(error)
    );
  }

  delete(id) {
    this.customAlertService.displayAlert("Gestión de Socios", ["¿Está seguro que desea eliminar este socio?"], () => {
      this.memberService.delete(id).subscribe(
        result => {
          this.getAll();
        },
        error => {
          console.error(error);
          this.customAlertService.displayAlert("Eliminación", ["Error al intentar eliminar el socio."]);
        })
    }, true);
  }

}
