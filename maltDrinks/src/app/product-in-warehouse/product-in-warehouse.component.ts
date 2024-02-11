import { Component, Input, OnInit } from '@angular/core';
import { IProduct } from '../../interfaces/IProduct';

@Component({
  selector: 'app-product-in-warehouse',
  templateUrl: './product-in-warehouse.component.html',
  styleUrls: ['./product-in-warehouse.component.css']
})
export class ProductInWarehouseComponent implements OnInit {
    @Input() product!: IProduct;
    visible = true;

    constructor() { }

    ngOnInit() {
        console.log(this.product);
    }

    setEditable(value: boolean) {
        this.product.editable = value;
    }
    
}
