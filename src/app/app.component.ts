import { Component, OnInit } from '@angular/core';
import { GlobalVariables } from './globalVariables';
import { Router, NavigationEnd, NavigationStart } from '@angular/router';
import { HttpClient } from '@angular/common/http';

declare var $: any;
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {


  constructor(public router: Router, public globalVariables: GlobalVariables, public http: HttpClient) {
    //ფუნქცია, რომლის მიხედვითაც ავტომატურად ვიგებთ მომხმარებელს რომელი ინტერფეისი გამოუჩნდეს user/admin...
    router.events.subscribe(
      (data) => {
        if (data instanceof NavigationStart) {
          if (data.url == undefined) {
            return
          }
          else if (data.url.includes('/user/')) {
            this.globalVariables.role = 'user'
          }
          else if (data.url.includes('/admin/')) {
            this.globalVariables.role = 'admin'
          }
        }
      });
    // subscribe((url: any) => {
    //   if(url.url == undefined){
    //     return
    //   }
    //   else if (url.url.includes('/user/')) {
    //     this.globalVariables.role = 'user'
    //     status = false
    //   }
    //   else if (url.url.includes('/admin/')) {
    //     this.globalVariables.role = 'admin'
    //     status = false
    //   }

    // },
    // () => {
    //   console.log(status)
    // })



  }

  
}
