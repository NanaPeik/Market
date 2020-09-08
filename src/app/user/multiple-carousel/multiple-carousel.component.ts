import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { changeFavoriteIcons } from 'src/app/changeFavoriteIcons';

declare var $: any;

@Component({
  selector: 'app-multiple-carousel',
  templateUrl: './multiple-carousel.component.html',
  styleUrls: ['./multiple-carousel.component.css']
})
export class MultipleCarouselComponent implements OnInit {

  constructor(public http: HttpClient, public changeFavoriteIcons: changeFavoriteIcons) { }

  popularProductsList
  ngOnInit() {
    this.http.get('http://tejmur-001-site5.ctempurl.com/BEMarketTestWS/api/Market/GetFavoriteProducts').subscribe((data: any) => {
      if (true) {
        var modified = [

        ]
        for (let i = 0; i < data.Result[0].Products.length; i += 3) {
          modified.push(
            data.Result[0].Products.slice(i, 4)
          )
        }

        this.popularProductsList = modified

      }
    })
    return
    //პოპულარული პროდუქტების სია
    this.http.get('/assets/jsonFilesForHttpRequest/mainPage.json').subscribe((data: any) => {
      this.popularProductsList = data.popularProducts
    })
  }
}
