import { Component, OnInit, Renderer2 } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import * as moment from 'moment';


@Component({
  selector: 'app-assignment-calendar',
  templateUrl: './assignment-calendar.component.html',
  styleUrls: ['./assignment-calendar.component.css']
})
export class AssignmentCalendarComponent implements OnInit {

  selectedDates: string[] = [];
  range = new FormGroup({
    start: new FormControl(),
    end: new FormControl(),
  });
  constructor(private renderer: Renderer2) { }

  ngOnInit() {

  }

  dateChanged(event) {

    const format = "YYYY-MM-DD";
    if (this.selectedDates.includes( moment(event).format(format))) {

      this.selectedDates = this.selectedDates.filter(x => x !=  moment(event).format(format))
    }
    else {
      console.log("else")
      this.selectedDates.push(moment(event).format(format));
    }
    console.log(this.selectedDates)
    this.highlightDays(this.selectedDates)
  }

  ngAfterViewInit() {
    this.highlightDays(["02-07-2022"])
  }

  private highlightDays(days: string[]) {
    const dayElements = document.querySelectorAll(
      'mat-calendar .mat-calendar-table .mat-calendar-body-cell'
    );
    const format = "YYYY-MM-DD";
    Array.from(dayElements).forEach((element) => {
      if (days.find((d) => moment(d).format(format) == moment(element.getAttribute('aria-label')).format(format))) {
        this.renderer.addClass(element, 'available');
        this.renderer.setAttribute(element, 'title', 'Event 1');
      } else {
        this.renderer.removeClass(element, 'available');
        this.renderer.removeAttribute(element, 'title');
      }
    });
  }
}
