import { Component, OnInit } from '@angular/core';
import { GlobalVariables } from 'src/app/globalVariables';

declare var $: any;

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  constructor(public globalVariables: GlobalVariables) { }


  ngOnInit() {
    this.globalVariables.routTiTle = 'მთავარი/პროდუქტები/კატეგორია 1'
  }
}
