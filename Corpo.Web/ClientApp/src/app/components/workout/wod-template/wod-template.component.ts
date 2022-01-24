import { Component, OnInit } from '@angular/core';
import { NgSelectConfig } from '@ng-select/ng-select';
import { CategoryExercises } from 'src/app/domain/category-exercises';
import { Exercise } from 'src/app/domain/exercise';
import { Tag } from 'src/app/domain/tag';
import { CustomAlertService } from 'src/app/services/custom-alert.service';
import { ExerciseService } from 'src/app/services/exercise.service';



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
	modalities: string[]=["AMRAP","Tabata","EMOM", "Tiempo", "Rondas"]

	constructor(private exerciseService: ExerciseService) { }

	ngOnInit() {
		console.log("getting excercises")
		this.getAll();
	}

	getAll() {
		console.log("getting excercises")
		this.exerciseService.getAll().subscribe(
			result => {
				console.log(result);
				this.exercises = result;
				this.exercisesSelect = this.exercises.map(x => ({ label: x.name, value: x.id }));
			},
			error => console.error(error)
		)
		this.exerciseService.getAllTags().subscribe(
			result => {
				console.log(result);
				this.tags = result;
				for (let i = 0; i < this.tags.length; i++) {
					let tagCheck: { tag: string, checked: boolean, id: number } = { tag: '', checked: false, id: 0 };
					tagCheck.tag = this.tags[i].name;
					tagCheck.checked = false;
					console.log("tag:",this.tags[i])
					tagCheck.id = this.tags[i].id;
					this.checkboxToTags.push(tagCheck);
					console.log(this.checkboxToTags);
				  }
			},
			error => console.error(error)
		);
		this.exerciseService.getAllCategories().subscribe(
			result => {
				console.log(result);
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



}
