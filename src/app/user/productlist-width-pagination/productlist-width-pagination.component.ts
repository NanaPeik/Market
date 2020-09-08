import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { changeFavoriteIcons } from 'src/app/changeFavoriteIcons';
import { GlobalVariables } from 'src/app/globalVariables';

declare var $: any;
@Component({
  selector: 'app-productlist-width-pagination',
  templateUrl: './productlist-width-pagination.component.html',
  styleUrls: ['./productlist-width-pagination.component.css']
})
export class ProductlistWidthPaginationComponent implements OnInit {

  constructor(public router: Router, public http: HttpClient, public changeFavoriteIcons: changeFavoriteIcons, public globalVariables: GlobalVariables, public route: ActivatedRoute) {
    route.params.subscribe(val => {
      if($(`.selectpicker option[value='${this.route.snapshot.params['categoryCode']}']`).length > 0){
        $('.selectpicker').selectpicker('val', this.route.snapshot.params['categoryCode'])
      }
      else{
        $('.selectpicker').selectpicker('val', '')
      }
      //პროდუქტების ჩატვირთვა
      this.loadProducts(false)
    });
  }

  pageNumber = []//უნდა შეივსოს დინამიურად
  activePageNumber = 1
  disablePrevButton = true
  disableNextButton = true
  productsPerPage = 20

  ngOnInit() {
  }


  //პროდუქტების სია
  productList = []
  loadProducts(selectActivePageNumber) {
    //აქტიური route_ს გაგება
    var activeRouter = this.router.url
    //პროდუქტების გასუფთავება
    this.productList = []
    //საწყისი და საბოლოო rande_ების გამოთვლა
    let startRange = (this.activePageNumber * this.productsPerPage) - this.productsPerPage,
      endRange = this.activePageNumber * this.productsPerPage


    let status = false
    let activeCategoryCode
    if (activeRouter.includes('/user/productList')) {
      activeCategoryCode = this.route.snapshot.params['categoryCode']
      if (activeCategoryCode != undefined || activeCategoryCode != '') {
        status = true
      }
    }
    else if (activeRouter.includes('/user/favorite')) {
      activeCategoryCode = this.route.snapshot.params['categoryCode']
      if (activeCategoryCode == "*") {
        status = true
      }
    }

    if (status) {
      this.http.get(this.globalVariables.url + `/Market/GetProductDetails?categoryCode=${activeCategoryCode}&startRange=${startRange}&endRange=${endRange}`).subscribe((data: any) => {
        if (data.OperationStatus == 1) {
          this.productList = data.Result.Products

          //pagination_ის გასწორება... მისი შევსება და საჭიროს მონიშვნა.
          this.pageNumber = []
          let t = 1
          for (let i = 0; i < data.Result.FavoriteProductAmount; i += this.productsPerPage) {
            this.pageNumber.push(t)
            t++
          }

          //pagination_ზე საჭირო გვერდის მონიშვნა
          if (selectActivePageNumber) {
            $('#customPagination .page-item').removeClass('active')
            $('#customPagination .page-item').eq(this.activePageNumber).addClass('active')
          }
          //prev ღილაკის disable
          this.disablePrevButton = (this.activePageNumber == this.pageNumber[0]) ? true : false;
          //next ღილაკის disable
          this.disableNextButton = (this.activePageNumber == this.pageNumber[this.pageNumber.length - 1]) ? true : false;
        }
      })
    }
  }

  //მოვლენა pagination_ზე. ფუნქცია, რომლის მეშვეობითაც შესაძლებელია გვერდების ცვლილება. 
  pageChanged(selectedIndex) {
    if (selectedIndex == 'prev') {
      if (this.disablePrevButton) {
        return
      }
      selectedIndex = this.activePageNumber
      selectedIndex--
    }
    else if (selectedIndex == 'next') {
      if (this.disableNextButton) {
        return
      }
      selectedIndex = this.activePageNumber
      selectedIndex++
    }

    this.activePageNumber = selectedIndex
    this.loadProducts(true)
  }
}
