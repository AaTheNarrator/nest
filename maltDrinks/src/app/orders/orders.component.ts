import { Component } from '@angular/core';
import { DataService } from '../data-service.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent {
    orders : any

    constructor(private dataService : DataService){
        let customer_id = JSON.parse(window.sessionStorage.getItem("customer_id")!).customer_id
        this.dataService.getOrders(customer_id).subscribe((response)=>{
            this.orders = response
        })
    }
}
