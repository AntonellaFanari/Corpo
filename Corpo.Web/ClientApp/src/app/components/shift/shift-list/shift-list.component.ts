import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ShiftSchedule } from '../../../domain/shift-schedule';
import { ShiftService } from '../../../services/shift.service';

@Component({
  selector: 'app-shift-list',
  templateUrl: './shift-list.component.html',
  styleUrls: ['./shift-list.component.css']
})
export class ShiftListComponent implements OnInit {
  schedules: ShiftSchedule[] = [];
  from: string;
  to: string;
  toList: boolean = false;
  checkboxes: any[] = [
    { name: 'cb1', value: 'cb1', checked: false },
    { name: 'cb2', value: 'cb2', checked: true },
    { name: 'cb3', value: 'cb3', checked: false },
    { name: 'cb4', value: 'cb4', checked: false },
    { name: 'cb5', value: 'cb5', checked: false },
  ]

  constructor(private shiftService: ShiftService, private dp: DatePipe) {

  }

  ngOnInit() {
    this.from = this.dp.transform(new Date(), 'yyyy-MM-dd');
    var to = new Date();
    this.to = this.dp.transform(to.setDate(to.getDate() + 30), 'yyyy-MM-dd');
    console.log(this.to);
    this.getAll();
  }

  getAll() {
    this.shiftService.getAll(this.from, this.to).subscribe(
      result => {
        console.log(result);
        this.schedules = result
      },
      error => console.error(error)
    )
  }

  //CheckAllOptions() {
  //  if (this.checkboxes.every(val => val.checked == true))
  //    this.checkboxes.forEach(val => { val.checked = false });
  //  else
  //    this.checkboxes.forEach(val => { val.checked = true });
  //}

  toListShift() {
    this.toList = true;
  }
}
