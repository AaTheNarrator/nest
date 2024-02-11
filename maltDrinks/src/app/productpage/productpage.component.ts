import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '../data-service.service';

@Component({
    selector: 'app-productpage',
    templateUrl: './productpage.component.html',
    styleUrls: ['./productpage.component.css']
})
export class ProductpageComponent {
    countProductForOrder = 1
    productId = ""
    dataOfProduct : any

    constructor(private route: ActivatedRoute,
                private dataService : DataService){
        this.route.paramMap.subscribe(params =>{
            this.productId = "" + params.get('id')
            this.dataService.getAllInfoForProductById(this.productId).subscribe({
                next: response =>{
                this.dataOfProduct = response
                },
                error: error => {
                    console.error('Ошибка при выполнении запроса:', error);
                }
            })
        })
    }
    
    count_plus_minus(sign : string){
        switch(sign){
            case "+":
                this.countProductForOrder++
                break
            case "-":
                if(this.countProductForOrder <= 1) return
                this.countProductForOrder--
                break
        }
    }

    add_to_cart(){
        const customer_id = JSON.parse(window.sessionStorage.getItem("customer_id")!).customer_id
        let data = {
            customer_id : customer_id,
            recipe_id : this.productId,
            amount : this.countProductForOrder
        }
        this.dataService.addToCart(data).subscribe({
            next(){
                alert("Товар добавлен в корзину")
            }
        })
    }
}
