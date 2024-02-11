import { Component, Input } from '@angular/core';
import { DataService } from '../data-service.service';

@Component({
  selector: 'app-product-in-cart',
  templateUrl: './product-in-cart.component.html',
  styleUrls: ['./product-in-cart.component.css']
})
export class ProductInCartComponent {
    @Input() product : any
    visible = true

    constructor(private dataService : DataService){}

    deleteFromCart(){
        this.visible = false
        const customer_id = JSON.parse(window.sessionStorage.getItem('customer_id')!).customer_id
        this.dataService.deleteFromCart(
            this.product.recipe_id,
            customer_id,
            this.product.amount
        )
    }
}
