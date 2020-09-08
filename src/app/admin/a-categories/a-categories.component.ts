import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GlobalVariables } from 'src/app/globalVariables';

declare var $: any;
@Component({
  selector: 'app-a-categories',
  templateUrl: './a-categories.component.html',
  styleUrls: ['./a-categories.component.css']
})
export class ACategoriesComponent implements OnInit {

  constructor(public http: HttpClient, public globalVariables: GlobalVariables) { }

  categoryInformation={
    CategoryName:"",
    CategotyNameEng:"",
    Parentcategory:""
  }
  tableDatas = []
  ngOnInit() {
    this.loadCategoryes()
  }

  //კატეგორიების ჩატვირთვა
  loadCategoryes() {
    this.tableDatas = []
    this.http.get(this.globalVariables.url + '/Admin/GetCategories').subscribe((data: any) => {
      if (data.OperationStatus == 1) {
        this.tableDatas = data.Result
      }
    })
  }

  //მოდალური ფორმის გახსნა და ველების გასუფთავება
  openAddNewCategory() {
    $('#addNewCategory').modal('show')
    $('#addNewCategory input').val('')
  }

  //ახალი კატეგორიის დამატება
  createNewCategory() {
    let categoryName = $('#name').val(),
      categoryNameEng = $('#name_ENG').val(),
      parentCategory = $('#parentCategory').val()

    this.http.get(this.globalVariables.url + `/Admin/SaveCategories?categoryName=${categoryName}&categoryNameEng=${categoryNameEng}&parentCategory=${parentCategory}`).subscribe((data: any) => {
      if (data.OperationStatus == 1) {
        //მოდალური ფორმის დახურვა
        $('#addNewCategory').modal('hide')
        //ცხრილის თავიდან ჩატვირთვა, რომ გამოჩნდეს ახლად დამატებული კატეგორია
        this.loadCategoryes()
      }
    })
  }
  //კატეგოტიების ცხრილში ცვლილებები(შესწორება, კატეგორიის წაშლა)
  editCategories(action, categoryCode,categoryName) {
    if (action == "edit") {
      
      // this.http.get(this.globalVariables.url + `/Admin/ChangeCategory?categoryCode=${categoryCode}&CategoryName=${categoryName}`).subscribe((data: any) => {
      //   if (data.OperationStatus == 1) {
      //     this.categoryInformation = data.Result
      //     $('#addNewCategory').modal('show')
      //   }
      // })
      alert('დასამატებელია სერვისი')

        this.categoryInformation.CategoryName="კატეგორია 4"
        this.categoryInformation.CategotyNameEng="kategoria 4"
        this.categoryInformation.Parentcategory="Parent Category"
        $('#addNewCategory').modal('show')
    }
    else if (action == "delete") {
      alert('ნამდვილად გსურთ წაშლა?')
      
      this.http.get(this.globalVariables.url + `/Admin/DeleteCategory?categoryCode=${categoryCode}`).subscribe((data: any) => {
        if (data.OperationStatus == 1) {
          this.loadCategoryes()
          return
        }
      })
    }
  }
}
