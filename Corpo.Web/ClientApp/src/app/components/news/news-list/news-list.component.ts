import { Component, OnInit } from '@angular/core';
import { News } from '../../../domain/news';
import { NewsView } from '../../../domain/news-view';
import { CustomAlertService } from '../../../services/custom-alert.service';
import { NewsService } from '../../../services/news.service';

@Component({
  selector: 'app-news-list',
  templateUrl: './news-list.component.html',
  styleUrls: ['./news-list.component.css']
})
export class NewsListComponent implements OnInit {
  newsList: NewsView[] = [];
  filterName = "";
  requestingList: boolean;

  constructor(private newsService: NewsService, private customAlertService: CustomAlertService) {
  }

  ngOnInit() {
    this.getAll();
  }

  getAll() {
    this.requestingList = true;
    this.newsService.getAll().subscribe(
      result => {
        this.requestingList = false;
        this.newsList = result.result;
        for (var i = 0; i < this.newsList.length; i++) {
          this.newsList[i].name = this.newsList[i].path.substr(0, 20);
        }
      },
      error => this.requestingList = false
    )
  }

  download(i) {
    let fileName = this.newsList[i].path;
    console.log(fileName);
    this.newsService.download(fileName).subscribe(
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
  delete(id) {
    this.customAlertService.displayAlert("Gestión de Comunicaciones", ["¿Está seguro que desea eliminar esta noticia?"], () => {
      this.requestingList = true;
      this.newsService.delete(id).subscribe(
        result => {
          console.log(result);
          this.getAll();
        },
        error => {
          this.requestingList = false;
          console.error(error);
          this.customAlertService.displayAlert("Gestión de Comunicaciones", ["Error al intentar eliminar la noticia."])
        })
    })
  }
}
