import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { NgSelectConfig } from '@ng-select/ng-select';
import { CategoryExercises } from 'src/app/domain/category-exercises';
import { Exercise } from 'src/app/domain/exercise';
import { Tag } from 'src/app/domain/tag';
import { ExerciseItem, Wod, WodGroup, WodTemplate } from 'src/app/domain/wod';
import { Modality } from 'src/app/domain/wod/modality';
import { CustomAlertService } from 'src/app/services/custom-alert.service';
import { ExerciseService } from 'src/app/services/exercise.service';
import { WodTemplateService } from 'src/app/wod/wod-template.service';



@Component({
	selector: 'app-wod-template',
	templateUrl: './wod-template.component.html',
	styleUrls: ['./wod-template.component.css']
})
export class WodTemplateComponent implements OnInit {

	filterExercise = "";
	exercises: Exercise[] = [];
	exercisesSelect: Array<any> = [];
	tags: Tag[] = [];
	checkboxToTags = [];
	categories: CategoryExercises[] = [];
	sendForm: boolean = false;
	modalities: Modality[] = [
		{ name: "AMRAP", id: 5, unit: "minutos" },
		{ name: "Tabata", id: 2, unit: "minutos" },
		{ name: "EMOM", id: 3, unit: "minutos" },
		{ name: "Tiempo", id: 4, unit: "minutos" },
		{ name: "Repeticiones", id: 1, unit: "repeticiones" }]
	wod: Wod = new Wod();
	activeWodGroup: number = 0;
	selectedExercise: any;
	selectedModality: number;
	units: string;
	name: string;
	detail: string;
	editDetail: boolean;
	kgs: string
	validationError: boolean;

	constructor(private exerciseService: ExerciseService,
		private wodTemplateService: WodTemplateService) { }

	ngOnInit() {
		this.getAll();
		//this.wod.addGroup(new WodGroup(this.createGuid()));
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
		if ((this.selectedExercise) && (this.selectedModality) && (this.units)) {
			this.validationError = false;
			var exercise = this.exercises.find(x => x.id == this.selectedExercise);
			var exerciseItem = new ExerciseItem();
			exerciseItem.exercise = exercise;
			exerciseItem.modality = this.modalities.find(x => x.id == this.selectedModality);
			exerciseItem.units = this.units;
			exerciseItem.kgs = this.kgs;

			this.wod.wodGroups[this.activeWodGroup].addExercise(exerciseItem);

			this.selectedModality = null;
			this.selectedExercise = "";
			this.kgs = "";
			this.units = null;
		}
		else {
			this.validationError = true;
		}
	}

	addwodGroupModal() {
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
		var wodTemplate = new WodTemplate(this.wod);
		wodTemplate.name = this.name;
		this.wodTemplateService.add(wodTemplate).subscribe(() => {
			console.log("success")
		}, error => {
			console.log(error)
		})
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

	onDrop(event: any) {
		event.preventDefault();
		event.stopPropagation();
		// your code goes here after droping files or any
	}

	onDragOver(evt) {
		evt.preventDefault();
		evt.stopPropagation();
	}

	onDragLeave(evt) {
		evt.preventDefault();
		evt.stopPropagation();
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
