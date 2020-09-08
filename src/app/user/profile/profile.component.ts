import { Component, OnInit } from '@angular/core';
import { GlobalVariables } from 'src/app/globalVariables';
import { HttpClient } from '@angular/common/http';
import * as $ from 'jquery';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  UserDetails={
      "PhoneNumber": "",
      "FirstName": "",
      "LastName": "",
      "PN": "",
      "Country": "",
      "Address": "",
      "City": ""
  }
  userFeatured={
    "OrdersAmount":'',
    "ProductAmount":''
  }
  constructor(public globalVariables: GlobalVariables, public http: HttpClient) { }

  ngOnInit() {

    this.globalVariables.routTiTle = 'მთავარი/პროფილი'
    this.http.get(this.globalVariables.url + `/Market/GetUserOrders?userCode=${this.globalVariables.userUnicCode}`).subscribe((data: any) => {
      if (data.OperationStatus == 1) {
        this.userFeatured=data.Result
      }
    })
  }

  //
  changeUserPassword(oldpass,newpass,newpassReturn){
    if(oldpass.value==''||newpass.value==''||newpassReturn.value==''){
      alert("შეავსთ ყველა ველი")
      return
    }
    console.log(oldpass.value,newpass.value,newpassReturn.value);
    if(newpass.value==newpassReturn.value){
      this.http.post(this.globalVariables.url + `/Market/ChangePassword?userCode=${this.globalVariables.userUnicCode}&oldPassword=${oldpass.value}&newPassword=${newpass.value}`,"")
      .subscribe((data: any) => {
        if (data.OperationStatus == 1) {
          return
        }
      },
      error => {
        console.log('error')
      });
    }
    else {
      alert("პაროლი უნდა ემთხვეოდეს გამეორებულ პაროლს");
    }
  }
  //იუზერის დეტალური ინფორმაციის შენახვა
  saveUserinfoDetiles(){
    if(this.UserDetails.Address==''||this.UserDetails.City==''||this.UserDetails.Country==''||
      this.UserDetails.FirstName==''||this.UserDetails.LastName==''||this.UserDetails.PN==''||this.UserDetails.PhoneNumber==''){
      alert("შეავსთ ყველა ველი")
      return
    }
    console.log(this.UserDetails.Address,this.UserDetails.City,this.UserDetails.Country,
      this.UserDetails.FirstName,this.UserDetails.LastName,this.UserDetails.PN,this.UserDetails.PhoneNumber);
    alert("შესაძლო Market/ChangeUserDetails სერვისის პრობლემა")
    // this.http.post(this.globalVariables.url + `/Market/ChangeUserDetails`,this.UserDetails)
    //   .subscribe((data: any) => {
    //     if (data.OperationStatus == 1) {
    //       return
    //     }
    //   },
    //   (error) => {
    //     console.log('error')
    //   });
  }

  //Market/LogOut?userCode={userCode}
  // logout(){
  //   this.globalVariables.logout()
  // }

}