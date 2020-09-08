import { Component, OnInit } from '@angular/core';
import { GlobalVariables } from 'src/app/globalVariables';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { changeFavoriteIcons } from 'src/app/changeFavoriteIcons';

declare var $: any
@Component({
  selector: 'app-product-detailinformation',
  templateUrl: './product-detailinformation.component.html',
  styleUrls: ['./product-detailinformation.component.css']
})
export class ProductDetailinformationComponent implements OnInit {

  constructor(public globalVariables: GlobalVariables, public route: ActivatedRoute, public http: HttpClient, public changeFavoriteIcons: changeFavoriteIcons) { }

  images = []
  productSpecifications = []
  isAvialable
  productPrice
  productCode
  productName

  isInFavorite
  ngOnInit() {
    this.globalVariables.routTiTle = "მთავარი/პროდუქტები/კატეგორია1/"
    //console.log(this.route.snapshot.params['id'])სავარაუდოდ ასე უნდა გავიგო პროდუქტის კოდი, რომელსაც სერვისს გადავცემ და ის დამიბრუნებს დეტალურ ინფორმაციას პროდუქტის შესახებ: სურათები დასახელება, კოდი, მონაცემები.
    this.http.get(this.globalVariables.url + `/Market/GetProductInformation?productCode=${this.route.snapshot.params['id']}`).subscribe((data: any) => {
      if (data.OperationStatus == 1) {
        let customData = data.Result
        //პროდუქტის სურათები
        this.images = customData.ImgUrl
        //პროდუქტი ხელმისაწვდომია თუ არა
        this.isAvialable = (customData.Available) ? 'ხელმისაწვდომია' : 'არ არის ხელმისაწვდომი'
        //პროდუქტის ფასი
        this.productPrice = customData.ProductPrice
        //პროდუქტის კოდი
        this.productCode = customData.ProductCode
        //პროდუქტის დასახელება
        this.productName = customData.ProductName
        //ფავორიტებში არის თუ არა დამატებული
        this.isInFavorite = customData.FavoriteStatus
        //პროდუქტის მახასიათებლები
        this.productSpecifications = customData.Specification

        //
        this.globalVariables.routTiTle += this.productName
      }
    })

    // this.http.get('/assets/jsonFilesForHttpRequest/productDetailInformation.json').subscribe((data: any) => {
    //   this.images = data.slider
    //   this.productSpecifications = data.productSpecifications
    //   this.isAvialable = (data.productInfo.isAvialable) ? 'ხელმისაწვდომია' : 'არ არის ხელმისაწვდომი'
    //   this.productPrice = data.productInfo.productPrice
    //   this.productCode = data.productInfo.productCode
    // })
  }

  //
  count = 1
  changeCount(e) {
    if (e == 'increase') {
      this.count++
    }
    else if (e == 'decrease' && this.count > 1) {
      this.count--
    }
  }
}
