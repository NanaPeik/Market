import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GlobalVariables } from 'src/app/globalVariables';
import { uploadImage } from 'src/app/uploadImage';

declare var $: any
@Component({
  selector: 'app-a-products',
  templateUrl: './a-products.component.html',
  styleUrls: ['./a-products.component.css']
})
export class AProductsComponent implements OnInit {

  constructor(public http: HttpClient, public globalVariables: GlobalVariables, public uploadImage: uploadImage) { }

  imgList = []


  showTable = true
  datasForTable = []
  statusList = []
  ngOnInit() {
    this.fillProductsTable()
  }

  //პროდუქტების ცხრილის შევსება
  fillProductsTable() {
    this.http.get(this.globalVariables.url + '/Admin/GetStatus').subscribe((data: any) => {
      if (data.OperationStatus == 1) {
        this.statusList = data.Result
      }
    },
      (err) => console.error(err),
      // The 3rd callback handles the "complete" event.
      () => {
        this.http.get(this.globalVariables.url + '/Admin/GetProductList').subscribe((data: any) => {
          if (data.OperationStatus == 1) {
            this.datasForTable = data.Result
          }
        },
          (err) => console.error(err),
          // The 3rd callback handles the "complete" event.
          () => {
            setTimeout(() => {
              $('.selectpicker').selectpicker('refresh')
            });
          })
      })
  }

  //
  changeContent() {
    this.showTable = !this.showTable

    //ვიყენებ ველების გასუფთავებისთვის
    if (!this.showTable) {
      this.newProduct = {
        category: '',
        productName: '',
        price: '',
        oldPrice: '',
        quantity: '',
        productCode: '',
        brand: '',
        country: '',
        favorite: false
      }
    }
  }

  //ახალი პროდუქტის დამატება
  newProduct
  addNewProduct() {
    let productName = this.newProduct.productName,
      productCode = this.newProduct.productCode,
      category = this.newProduct.category,
      quantity = this.newProduct.quantity,
      price = this.newProduct.price,
      oldPrice = this.newProduct.oldPrice,
      country = this.newProduct.country,
      brand = this.newProduct.brand,
      favorite = this.newProduct.favorite

    let bodyParameters = {
      similarProducts: [1,2],
      pictures: [1,2]
    }
    if (productName && productCode && category && quantity && price && oldPrice && country && brand) {
      this.http.post(this.globalVariables.url + `/Admin/SaveProducts?productName=${productName}&productCode=${productCode}&category=${category}&quantity=${quantity}&price=${price}&oldPrice=${oldPrice}&country=${country}&brand=${brand}&favorite=${favorite}`, bodyParameters).subscribe((data: any) => {
        // this.http.get(this.globalVariables.url + `/Admin/SaveProducts?productName=${productName}&productCode=${productCode}&category=${category}&quantity=${quantity}&price=${price}&oldPrice=${oldPrice}&country=${country}&brand=${brand}&favorite=${favorite}`).subscribe((data: any) => {
        if (data.OperationStatus == 1) {
          this.changeContent()
          this.fillProductsTable()
        }
      },
        (err) => {
          console.error(err)
        },
        // The 3rd callback handles the "complete" event.
        () => {
          console.log('success')
        })
    }
    else {
      alert('შეავსეთ ყველა მონაცემი')
    }
  }
}
