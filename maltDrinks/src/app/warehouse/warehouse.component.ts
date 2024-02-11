import { Component } from '@angular/core';
import { IProduct} from '../../interfaces/IProduct'
import { DataService } from '../data-service.service';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-warehouse',
  templateUrl: './warehouse.component.html',
  styleUrls: ['./warehouse.component.css']
})
export class WarehouseComponent {
    open_menu_visible = false
    add_btn_text = "Добавить"

    product_id = 1
    product_amount = 0

    products: IProduct[] = []
    productsForAdd : IProduct[] = []

    constructor(private dataService: DataService) {
        const id = JSON.parse(window.sessionStorage.getItem('manufacturer_id')!).manufacturer_id;
        this.dataService.getProductFromWarehouse(id).subscribe((response) => {
            this.products = response.map((product: IProduct) => {
                return { ...product, editable: false }; 
            });
        });

        this.dataService.getAllProducts().subscribe((data)=>{
            this.productsForAdd = data
        })
    }

    onChange(event: any){
        this.product_id = event.target.value;
    }

    openOrCloseAddMenu(){
        if(this.open_menu_visible){
            this.add_btn_text = 'Добавить'
        }
        else{
            this.add_btn_text = 'Скрыть'
        }
        this.open_menu_visible = !this.open_menu_visible
    }

    addProduct(){
        const manufacturer_id = JSON.parse(window.sessionStorage.getItem("manufacturer_id")!).manufacturer_id
        
        let data = {
            manufacturer_id : manufacturer_id,
            product_id : this.product_id,
            amount : this.product_amount
        }

        this.dataService.addProductToWareHouse(data)

        const newProduct : IProduct = {
            product_id: this.product_id,
            name : this.productsForAdd[this.product_id - 1].name,
            amount : this.product_amount,
            editable : false,
            isSelected: false
        }

        this.products.push(newProduct)
        this.openOrCloseAddMenu()
    }

    saveAllProducts() {
        const id = JSON.parse(window.sessionStorage.getItem('manufacturer_id')!).manufacturer_id;
        const productsToUpdate = this.products.filter(product => product.editable);
        
        for (const product of productsToUpdate) {
            const product_id = product.product_id;

            let data = {
                manufacturer_id: id,
                product_id: product_id,
                amount: product.amount
            };

            this.dataService.updateWareHouse(data);
        }
    }

    deleteSelectedProducts() {
        const id = JSON.parse(window.sessionStorage.getItem('manufacturer_id')!).manufacturer_id;
    
        for (const product of this.products) {
            if (product.isSelected) {
                const product_id = product.product_id;

                let data = {
                    manufacturer_id: id,
                    product_id: product_id
                };

                this.dataService.deleteFromWareHouse(data);
            }
        }
    
        this.products = this.products.filter(product => !product.isSelected);
    }
    
}

