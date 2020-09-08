import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

export class GlobalVariables {
    constructor( public http: HttpClient, public router:Router) {}
    windowLocationOrigin = window.location.origin
    url = (this.windowLocationOrigin == "http://localhost:4200") ? "http://tejmur-001-site5.ctempurl.com/BEMarketTestWS/api" : this.windowLocationOrigin + "/BStock/WebApi/api";

    routTiTle = ""

    /* მომხმარებლის როლი */
    role = '' // user/admin
    userUnicCode=''
    LoginOrLogout=''
    //
    logout(){
        this.http.get(this.url + `/Market/LogOut?userCode=${this.userUnicCode}`).subscribe((data: any) => {
          if (data.OperationStatus == 1) {
            this.LoginOrLogout="LogIn"
            return
          }
        },
        (err)=>{
          console.log('error')
        })
      }
}
