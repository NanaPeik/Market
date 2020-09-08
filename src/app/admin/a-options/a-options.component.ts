import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GlobalVariables } from 'src/app/globalVariables';
import { uploadImage } from 'src/app/uploadImage';

declare var $: any
@Component({
  selector: 'app-a-options',
  templateUrl: './a-options.component.html',
  styleUrls: ['./a-options.component.css']
})
export class AOptionsComponent implements OnInit {

  constructor(public http: HttpClient, public globalVariables: GlobalVariables, public uploadImage: uploadImage) { }

  imagesList = []
  allData = {
    MarketName: "",
    MarketLogo: "",
    InstagramURL: "instagram.com",
    FacebookURL: "Facebook.com",
    YoutubeURL: "youtube.com",
    Colors: [],
    Themes: [],
    Language: []
  }
  ngOnInit() {
    $('.selectpicker').selectpicker('refresh')

    this.http.get(this.globalVariables.url + '/Admin/GetCompanyDetails').subscribe((data: any) => {
      if (data.OperationStatus == 1) {
        this.allData = data.Result
      }
    })
  }

  //
  saveBTN() {

    let data = {
      "MarketName": $("#marketName").val(),
      "MarketLogo": "???", //გასარკვევია ეს როგორ გაკეთდება
      "InstagramURL": $("#instagramPageLink").val(),
      "FacebookURL": $("#facebookPageLink").val(),
      "YoutubeURL": $("#youtubePageLink").val(),
      "MainLanguage": $("input[name=optradio]:checked").attr('id'),
      "Colors": $('#color').val(),
      "Themes": $('#theme').val(),
      "Language": $("input[name=optradio]:checked").attr('id')
    }

    console.log(data)
    alert('ჩასასწორებელია სერვისი.')
    return
    this.http.post(this.globalVariables.url + '/Admin/ChangeComapanyDetails', data).subscribe((data: any) => {
      if (data.OperationStatus == 1) {
        console.log('success')
      }
    })
  }
}
