import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GlobalVariables } from 'src/app/globalVariables';
import { uploadImage } from 'src/app/uploadImage';

declare var $: any;
@Component({
  selector: 'app-a-main-page',
  templateUrl: './a-main-page.component.html',
  styleUrls: ['./a-main-page.component.css']
})
export class AMainPageComponent implements OnInit {

  constructor(public http: HttpClient, public globalVariables: GlobalVariables, public uploadImage: uploadImage) { }

  tableDatas = ["პროდუქცია", "გადახდის პირობები", "კონტაქტი", "მიტანის სერვისი"]
  sliderImg = []
  maxSliderImageLength = 10
  contactInformation = {
    CompanyName: "",
    CompanyNameEng: "",
    PhoneNumber: "",
    Email: "",
    Address: "",
    Map: false
  }
  ngOnInit() {
    //საკონტაქტო ინფორმაციის ველების შევსება
    this.http.get(this.globalVariables.url + '/Admin/GetCompanyInfromation').subscribe((data: any) => {
      if (data.OperationStatus == 1) {
        this.contactInformation = data.Result[0]
      }
    })
  }

  //მოდალური ფორმის გახსნა
  openNewPageModal() {
    $('#newPageModal').modal('show')
    $('#newPageModal form')[0].reset()
  }

  //კომპანიის ინფორმაციის რედაქტირება
  changeContactInfo() {
    let companyName = this.contactInformation.CompanyName,
      companyNameEng = this.contactInformation.CompanyNameEng,
      phoneNumber = this.contactInformation.PhoneNumber,
      address = this.contactInformation.Address,
      email = this.contactInformation.Email,
      map = this.contactInformation.Map;

    this.http.get(this.globalVariables.url + `/Admin/ChangeCompanyInformation?companyName=${companyName}&companyNameEng=${companyNameEng}&phoneNumber=${phoneNumber}&address=${address}&email=${email}&map=${map}`).subscribe((data: any) => {
      if (data.OperationStatus == 1) {
        return
      }
    })
  }
}
