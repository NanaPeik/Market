import { Component, OnInit } from '@angular/core';
import { GlobalVariables } from 'src/app/globalVariables';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FactAndQuestionsComponent } from '../fact-and-questions/fact-and-questions.component';
import { EmailValidator } from '@angular/forms';

declare var $: any
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(public globalVariables: GlobalVariables, public router: Router, public http: HttpClient) { }
  categoryList
  userRegistrationData={
      "FistName": "gs",
      "LastName": "ss",
      "Email": "as",
      "Password": "ss"
  }
  ngOnInit() {
    this.globalVariables.LoginOrLogout="LogIn"
    this.http.get(this.globalVariables.url + '/Market/GetCategoryList').subscribe((data: any) => {
      if (data.OperationStatus == 1) {
        this.categoryList = data.Result.Massive
      }
    },
    (err) => console.error(err),
    // The 3rd callback handles the "complete" event.
    () => {
      setTimeout(() => {
        $('.selectpicker').selectpicker('refresh')
      });
    })
  }

  //
  mainCategoryDropdownChange(ev){
    this.router.navigate(['user/productList', ev.target.value])
  }



  modalTitle
  //მოდალური ფორმის გახსნა და გასუფთავება გასუფთავება
  showModal() {
      this.modalTitle = "ავტორიზაცია"
      $('#loginModal').modal('show')
    
  }

  //რეგისტრაციისთვის საჭირო ვიზუალის ჩვენება
  registry() {
    this.modalTitle = "რეგისტრაცია"
  }

  //
  showLoginForm() {
    this.modalTitle = "ავტორიზაცია"
  }

  //
  login(email,password) {
    if(email.value==''||password.value==''){
      alert("შეავსთ ყველა ველი")
      return
    }
    this.http.get(this.globalVariables.url + `/Market/UserAuthorization?email=${email.value}&password=${password.value}`).subscribe((data: any) => {
      if (data.OperationStatus == 1) {
        this.globalVariables.userUnicCode = data.Result
        this.globalVariables.LoginOrLogout="LogOut"
        $('#loginModal').modal('hide')
        // this.router.navigate(['user/profile'])
      }
    })
   
  }
  //ახალი მომხმარებლის დარეგისტრირება
  registerNewUser(fn,ln,em,pas,pas1){
    console.log(fn.value,ln.value,pas.value,em.value);

    if(fn.value==''||ln.value==''||pas.value==''||em.value==''||pas1.value==''){
      alert("შეავსთ ყველა ველი")
      return
    }else if(pas.value!=pas1.value){
      alert("პაროლი უნდა ემთხვეოდეს გამეორებულ პაროლს");
      return
    }
    this.modalTitle = "ავტორიზაცია"

    alert("წარმატებული ტეგისტრაცია:)")
    // this.http.post(this.globalVariables.url + `/Market/UserRegistration`,this.userRegistrationData)
    //   .subscribe((data: any) => {
    //     if (data.OperationStatus == 1) {
    //         return
    //     }
    //   },
    //   error => {
    //     console.log('error')
    //   });

  }
   //LogOut
   logout(){
    this.globalVariables.logout()
    this.router.navigate(['user/header'])
  }
  //პროფილზე გადასვლა
  showProfile(){
    this.router.navigate(['user/profile'])

  }
}
