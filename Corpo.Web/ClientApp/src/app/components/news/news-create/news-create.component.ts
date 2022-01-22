import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Route, Router } from '@angular/router';
import { News } from '../../../domain/news';
import { CustomAlertService } from '../../../services/custom-alert.service';
import { NewsService } from '../../../services/news.service';

@Component({
  selector: 'app-news-create',
  templateUrl: './news-create.component.html',
  styleUrls: ['./news-create.component.css']
})
export class NewsCreateComponent implements OnInit {
  formCreate: FormGroup;
  from: string;
  to: string;
  file: File;
  send: boolean = false;
  urls = [];

  constructor(private formBuilder: FormBuilder, private dp: DatePipe, private newsService: NewsService,
    private customAlertService: CustomAlertService, private router: Router) {
    this.from = this.dp.transform(new Date(), 'yyyy-MM-ddTHH:mm');
    console.log(this.from);
    let to = new Date();
    this.to = this.dp.transform(to.setDate(to.getDate() + 31), 'yyyy-MM-ddTHH:mm');
    console.log(this.to);
    this.formCreate = this.formBuilder.group({
      title: ['', Validators.required],
      from: [this.from, Validators.required],
      to: [this.to, Validators.required],
      path:''
    })
  }

  ngOnInit() {
  }

  get f() {
    return this.formCreate.controls;
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
    console.log(this.urls);

  }

  createNews() {
    let news = new News();
    news.title = this.formCreate.value.title;
    news.from = this.formCreate.value.from;
    news.to = this.formCreate.value.to;
    news.file = this.file;
    return news;
  }

  submit() {
    this.send = true;
    if (this.formCreate.valid) {
      let news = this.createNews();
      this.newsService.add(news).subscribe(
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
            this.customAlertService.displayAlert("Gestión de Comunicaciones", ["Hubo un problema al intentar crear la noticia."]);
          }
        }      )
    }

  }

}
