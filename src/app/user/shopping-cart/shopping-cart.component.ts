import { Component, OnInit } from '@angular/core';
import { GlobalVariables } from 'src/app/globalVariables';
import { HttpClient } from '@angular/common/http';

declare var $: any;
@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {

  constructor(public globalVariables: GlobalVariables, public http: HttpClient) { }

  productList = []
  totalCost = 0
  ngOnInit() {
    this.globalVariables.routTiTle = "მთავარი/კალათა"

    this.loadReservedProductTable()
  }


  //ცხრილის შევსება კალათაში დამატებული პროდუქტების სიით
  loadReservedProductTable() {
    this.http.get(this.globalVariables.url + "/Market/GetReservedProducts").subscribe((data: any) => {
      if (data.OperationStatus == 1) {
        this.productList = data.Result

        //ჯამურიღირებულების გამოანგარიშება
        this.totalCost = 0
        for (let index = 0; index < data.Result.length; index++) {
          this.totalCost += data.Result[index].Price * data.Result[index].Quantity
        }
      }
    })
  }

  //პროდუქტის ამოშლა ცხრილიდან
  removeItemFromTable(productCode) {
    if (confirm(`ნამდვილად გსურთ პროდუქტის წაშლა?`)) {
      this.http.get(this.globalVariables.url + `/Market/DeleteReservedProduct?productCode=${productCode}`).subscribe((data: any) => {
        if (data.OperationStatus == 1) {
          this.loadReservedProductTable()
        }
      })
      // this.productList = this.productList.filter(o => o.unitPrice != clickedRowIndex)
      // this.totalCost = (this.productList.length == 0) ? 0 : this.productList.map(item => Number(item.sum)).reduce((prev, next) => prev + next);
    }
  }


  //
  preview = true//false //true
  title = 'კალათა'
  makeOrder() {
    this.preview = false
    this.title = 'შეკვეთა'
  }




}
