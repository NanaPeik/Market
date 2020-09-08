import { HttpClient } from '@angular/common/http';
import { GlobalVariables } from './globalVariables';

export class changeFavoriteIcons {
    constructor(public http: HttpClient, public globalVariables: GlobalVariables) { }

    func(ev, productCode) {
        ev.stopPropagation()

        let buttonText = ev.target.innerText,
            url = ''
        if (ev.target.innerText == "favorite") {
            buttonText = "favorite_border"
            url = `/Market/DeleteFavoriteProduct?productCode=${productCode}`
        }
        else if(ev.target.innerText == "favorite_border"){
            buttonText = "favorite"
            url = `/Market/SaveFavoriteProduct?productCode=${productCode}`
        }

        this.http.get(this.globalVariables.url + url).subscribe((data: any) => {
            if (data.OperationStatus == 1) {
                ev.target.innerText = buttonText
            }
        })
    }
}