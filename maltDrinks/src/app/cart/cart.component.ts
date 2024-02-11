import { Component } from '@angular/core';
import { DataService } from '../data-service.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent {
    cart : any
    total_price = 0


    constructor(private dataService:DataService){
        let id = JSON.parse(window.sessionStorage.getItem("customer_id")!)
        this.dataService.getCart(id).subscribe((response)=>{
            this.cart = response
            for(let p of response){
                this.total_price += +p.total_price
            }
        })
    }

    newOrder(){
        const customer_id = JSON.parse(window.sessionStorage.getItem("customer_id")!).customer_id

        this.dataService.addOrder({customer_id:customer_id}).subscribe((response)=>{
            alert('Заказ успешно создан')
            this.cart = []
            this.total_price = 0
            this.dataService.clearCart(customer_id)
        })
    }
}
