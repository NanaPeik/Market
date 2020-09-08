import { Component, OnInit } from '@angular/core';
import { GlobalVariables } from 'src/app/globalVariables';

@Component({
  selector: 'app-fact-and-questions',
  templateUrl: './fact-and-questions.component.html',
  styleUrls: ['./fact-and-questions.component.css']
})
export class FactAndQuestionsComponent implements OnInit {

  constructor(public globalVariables: GlobalVariables) { }

  ngOnInit() {
    this.globalVariables.routTiTle = 'მთავარი/კითხვებზე პასუხი'
  }

}
