import { Component, OnInit } from '@angular/core';
import { GlobalVariables } from 'src/app/globalVariables';

@Component({
  selector: 'app-favorite',
  templateUrl: './favorite.component.html',
  styleUrls: ['./favorite.component.css']
})
export class FavoriteComponent implements OnInit {

  constructor(public globalVariables: GlobalVariables) { }

  ngOnInit() {
    this.globalVariables.routTiTle = 'მთავარი/სასურველი პროდუქტები'

  }

}
