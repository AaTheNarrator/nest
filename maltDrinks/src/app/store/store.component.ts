import { Component } from '@angular/core';
import { DataService } from '../data-service.service';

@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.css']
})
export class StoreComponent {
  products : any;

    constructor(private dataService: DataService){
        this.dataService.getAllRecipe().subscribe(response => {
            this.products = response;
        })
    }
}
