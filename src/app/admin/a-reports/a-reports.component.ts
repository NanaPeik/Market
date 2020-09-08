import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GlobalVariables } from 'src/app/globalVariables';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-a-reports',
  templateUrl: './a-reports.component.html',
  styleUrls: ['./a-reports.component.css']
})
export class AReportsComponent implements OnInit {

  constructor(public http: HttpClient, public globalVariables: GlobalVariables, public datePipe: DatePipe) { }

  ngOnInit() {
  }

  startDate
  endDate
  datasForTable = []
  //
  changePicker() {
    let start = this.datePipe.transform(this.startDate, 'yyyy-MM-dd'),
      end = this.datePipe.transform(this.endDate, 'yyyy-MM-dd')
    if (start != '' && start != undefined && start != null && end != '' && end != undefined && end != null) {
      this.datasForTable = []
      this.http.get(this.globalVariables.url + `/Admin/GetReport?startDate=${start}&endDate=${end}`).subscribe((data: any) => {
        if (data.OperationStatus == 1) {
          this.datasForTable = data.Result
        }
      })
    }
  }
}

