import { Component, OnInit } from '@angular/core';
import { GlobalVariables } from 'src/app/globalVariables';
import { HttpClient } from '@angular/common/http';

declare var $: any;

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent implements OnInit {

  constructor(public globalVariables: GlobalVariables, public http: HttpClient) { }

  carouselImages
  ngOnInit() {
    this.globalVariables.routTiTle = ''

    //სერვისი, რომლის მეშვეობითაც ივსება სლაიდერი(carousel)
    this.http.get(this.globalVariables.url + '/Market/GetPicturesLinks').subscribe((data:any) =>{
      if (data.OperationStatus == 1) {
        this.carouselImages = data.Result
      }
    })
  }
}
