import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GlobalVariables } from 'src/app/globalVariables';
import * as $ from 'jquery';

@Component({
  selector: 'app-a-users-list',
  templateUrl: './a-users-list.component.html',
  styleUrls: ['./a-users-list.component.css']
})
export class AUsersListComponent implements OnInit {

  constructor(public http: HttpClient, public globalVariables: GlobalVariables) { }

  tabledatas=[]
  classForBlock
  ngOnInit() {
    this.classForBlock=false
    this.loadTable()

  }

  //ცხრილის შევსება
  loadTable() {

    this.http.get(this.globalVariables.url + '/Admin/GetUserDetails').subscribe((data: any) => {
      if (data.OperationStatus == 1) {
        this.tabledatas = data.Result
      }
    })
  }

  //
  actionsOnUsers(action, userPN, BlkStatus) {
    let customURL = ''

    if (action == "edit") {
      alert('დასამატებელია სერვისი')
      return
    }
    else if (action == "block") {
      customURL = `/Admin/BlockClient?clientCode=${userPN}`
    }
    else if (action == "delete") {
      this.classForBlock=BlkStatus
      customURL = `/Admin/DeleteClient?clientCode=${userPN}`
    }
    if (customURL == '') {
      alert('დაფიქსირდა შეცდომა')
      return
    }
    this.http.get(this.globalVariables.url + customURL).subscribe((data: any) => {
      if (data.OperationStatus == 1) {
        this.loadTable()
      }
    })
  }
}
