import { Component, OnInit } from '@angular/core';
import { products as data } from './data/product';
import { DataService } from './data-service.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {
    title = 'maltDrinks';
}
