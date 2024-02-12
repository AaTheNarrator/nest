import { Component } from '@angular/core';
import { DataService } from '../data-service.service';
import { HttpClient , HttpHeaders} from '@angular/common/http';

@Component({
  selector: 'app-orders-m',
  templateUrl: './orders-m.component.html',
  styleUrls: ['./orders-m.component.css']
})
export class OrdersMComponent {
    orders : any = []

    constructor(private dataService : DataService,
      private http : HttpClient){
        const jwt = window.sessionStorage.getItem('jwt_manufacturer')
        const jwt_token = JSON.parse(jwt!).token
        this.http.get(this.dataService.server_address + "orders",{
          headers:new HttpHeaders({
            'Authorization' : 'Bearer ' + jwt_token
          })
        })
          .subscribe((data)=>{
            console.log(data)
          })
    }
}
