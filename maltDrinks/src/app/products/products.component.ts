import { Component, Input } from '@angular/core';
import * as anime from 'animejs/lib/anime.es.js';

@Component({
    selector: 'app-products',
    templateUrl: './products.component.html',
    styleUrls: ['./products.component.css']
})
export class ProductsComponent {
    @Input() product: any
}


