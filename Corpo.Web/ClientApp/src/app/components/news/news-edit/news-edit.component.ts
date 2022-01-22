import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { News } from '../../../domain/news';
import { NewsView } from '../../../domain/news-view';
import { CustomAlertService } from '../../../services/custom-alert.service';
import { NewsService } from '../../../services/news.service';

@Component({
  selector: 'app-news-edit',
  templateUrl: './news-edit.component.html',
  styleUrls: ['./news-edit.component.css']
})
export class NewsEditComponent implements OnInit {
  formEdit: FormGroup;
  id: number;
  news: NewsView;
  urls = [];
  file: File;
  send: boolean = false;

  constructor(private formBuilder: FormBuilder, private route: ActivatedRoute, private newsService: NewsService,
    private router: Router, private customAlertService: CustomAlertService) {
    this.route.queryParams.subscribe(params => { this.id = parseInt(params['id']) });
    this.formEdit = this.formBuilder.group({
      title: ['', Validators.required],
      from: ['', Validators.required],
      to: ['', Validators.required],
      path: ''
    })
  }

  ngOnInit() {
    this.newsService.getById(this.id).subscribe(
      result => {
        console.log(result);
        this.news = result.result;
        this.toCompleteForm();
        this.urls.push(this.news.path);
      },
      error => console.error(error)
    )
  }

  toCompleteForm() {
    this.formEdit.patchValue({
      title: this.news.title,
      from: this.news.from,
      to: this.news.to,
      path: this.news.path
    })
  }

  get f() {
    return this.formEdit.controls;
  }

  public onFileSelection(event: any): void {
    this.urls = [];
    const files: FileList = event.target.files;
    this.file = <File>files.item(0);
    console.log(this.file);

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

  }

  editNews() {
    let news = new News();
    news.title = this.formEdit.value.title;
    news.from = this.formEdit.value.from;
    news.to = this.formEdit.value.to;
    news.file = this.file;
    return news;
  }

  submit() {
    this.send = true;
    if (this.formEdit.valid) {
      let news = this.editNews();
      this.newsService.update(this.id, news).subscribe(
        result => {
          console.log(result);
          this.router.navigate(['noticias-list']);
        },
        error => {
          console.error(error);
          if (error.status === 400) {
            this.customAlertService.displayAlert("Gestión de Comunicaciones", error.error.errores);
          }
          if (error.status === 500) {
            this.customAlertService.displayAlert("Gestión de Comunicaciones", ["Hubo un problema al intentar modificar la noticia."]);
          }
        })
    }

  }
}
