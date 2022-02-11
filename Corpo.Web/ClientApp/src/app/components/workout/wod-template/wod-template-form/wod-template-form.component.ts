
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, EventEmitter, Input, OnInit, Output, ViewChild, ViewContainerRef } from '@angular/core';
import { Router } from '@angular/router';
import { CategoryExercises } from 'src/app/domain/category-exercises';
import { Exercise } from 'src/app/domain/exercise';
import { Tag } from 'src/app/domain/tag';
import { ExerciseItem, Wod, WodGroup, WodTemplate } from 'src/app/domain/wod';
import { WodMember } from 'src/app/domain/wod-member';
import { Modality } from 'src/app/domain/wod/modality';
import { ExerciseService } from 'src/app/services/exercise.service';
import { WodMemberService } from 'src/app/wod/wod-member.service';
import { WodTemplateService } from 'src/app/wod/wod-template.service';

@Component({
  selector: 'app-wod-template-form',
  templateUrl: './wod-template-form.component.html',
  styleUrls: ['./wod-template-form.component.css']
})

export class WodTemplateFormComponent implements OnInit {

  filterExercise = "";
  exercises: Exercise[] = [];
  exercisesSelect: Array<any> = [];
  tags: Tag[] = [];
  checkboxToTags = [];
  categories: CategoryExercises[] = [];
  sendForm: boolean = false;
  modalities: Modality[] = [
    { name: "AMRAP", id: 1, unit: "minutos" },
    { name: "Tabata", id: 2, unit: "minutos" },
    { name: "EMOM", id: 3, unit: "minutos" },
    { name: "Tiempo", id: 4, unit: "minutos" },
    { name: "Repeticiones", id: 5, unit: "repeticiones" }]

  activeWodGroup: number = 0;
  selectedExercise: any;
  selectedModality: number;
  units: string;
  name: string
  detail: string;
  editDetail: boolean;
  saved: boolean;


  constructor(private exerciseService: ExerciseService,
    private wodTemplateService: WodTemplateService,
    private wodMemberService: WodMemberService,
    private router: Router) {
  }

  @Input() wod: Wod;
  @Input() memberId: number;
  @Input() date: string;
  @Output() goBackEvent = new EventEmitter();
  @Output() saveEvent = new EventEmitter();


  ngOnInit() {
    this.name = this.wod.name;
    this.getAll();
  }

  ngOnChanges() {
    /**********THIS FUNCTION WILL TRIGGER WHEN PARENT COMPONENT UPDATES 'someInput'**************/
    //Write your code here  
  }

  createGuid() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      var r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }

  addExercise() {

    if (this.wod.wodGroups.length == 0) {
      this.addwodGroup();
    }
    var exercise = this.exercises.find(x => x.id == this.selectedExercise);
    var exerciseItem = new ExerciseItem();
    exerciseItem.exercise = exercise;
    console.log("selectedModality", this.selectedModality)
    exerciseItem.modality = this.modalities.find(x => x.id == this.selectedModality);
    exerciseItem.units = this.units;

    this.wod.wodGroups[this.activeWodGroup].addExercise(exerciseItem);

    this.selectedModality = null;
    this.selectedExercise = "";
    this.units = null;
  }

  addwodGroupModal() {
    console.log("lksdjflds")
    document.getElementById("group-name-modal").click();
  }

  addwodGroup() {
    this.wod.addGroup(new WodGroup(this.createGuid(), this.detail))
    this.activeWodGroup = this.wod.wodGroups.length - 1;
    this.detail = "";
  }

  editwodGroup() {
    this.wod.wodGroups[this.activeWodGroup].detail = this.detail;
    this.editDetail = false;
  }

  editGroupDetail(detail) {
    this.editDetail = true;
    this.detail = detail;
    document.getElementById("group-name-modal").click();
  }

  deleteItem(groupIndex, exerciseIndex) {
    this.wod.wodGroups[groupIndex].exercises.splice(exerciseIndex, 1);
  }

  setActiveWodGroup(index: number) {
    this.activeWodGroup = index;
    console.log(index)
  }

  deleteGroup(index) {
    this.wod.wodGroups.splice(index, 1);
    if (this.activeWodGroup == index)
      this.activeWodGroup = 0;
  }

  save() {
    this.wodMemberService.add(this.getWod(this.wod)).subscribe(() => {
      console.log("success")
      this.saveEvent.emit(this.date);
      this.saved = true;
    }, error => {
      console.log(error)
    })
  }


  getWod(wod) {
    var wodMember = new WodMember();
    wod.wodGroups.forEach(g => {
      g.exercises.forEach(e => {
        wodMember.wodGroupsMember.push({
          detail: g.detail,
          groupIndex: g.groupIndex,
          exerciseId: e.exercise.id,
          modalityId: e.modality.id,
          units: e.units
        })
      })
    })
    wodMember.date = this.date
    wodMember.memberId = this.memberId;
    return wodMember;
  }

  goBack() {
    this.goBackEvent.emit()
  }

  getAll() {
    this.exerciseService.getAll().subscribe(
      result => {
        this.exercises = result;
        this.exercisesSelect = this.exercises.map(x => ({ label: x.name, value: x.id }));
      },
      error => console.error(error)
    )
    this.exerciseService.getAllTags().subscribe(
      result => {
        this.tags = result;
        for (let i = 0; i < this.tags.length; i++) {
          let tagCheck: { tag: string, checked: boolean, id: number } = { tag: '', checked: false, id: 0 };
          tagCheck.tag = this.tags[i].name;
          tagCheck.checked = false;
          tagCheck.id = this.tags[i].id;
          this.checkboxToTags.push(tagCheck);
        }
      },
      error => console.error(error)
    );
    this.exerciseService.getAllCategories().subscribe(
      result => {
        this.categories = result;
      },
      error => console.error(error)
    );

  }

  createListTags() {
    let tags: Tag[] = [];
    console.log(this.checkboxToTags);
    for (var i = 0; i < this.checkboxToTags.length; i++) {
      console.log(this.checkboxToTags[i]);
      if (this.checkboxToTags[i].checked) {
        let tag = this.tags.find(x => x.name == this.checkboxToTags[i].tag);
        tags.push(tag);
      }
    };
    return tags;
  }

  drop(event: CdkDragDrop<string[]>) {
    var previousIndex = this.wod.wodGroups[this.activeWodGroup].groupIndex;
    moveItemInArray(this.wod.wodGroups, event.previousIndex, event.currentIndex);
    if (event.previousIndex == this.activeWodGroup)
      this.activeWodGroup = event.currentIndex;

    else {
      this.activeWodGroup = this.wod.wodGroups.findIndex(x => x.groupIndex == previousIndex)
    }
  }

}
