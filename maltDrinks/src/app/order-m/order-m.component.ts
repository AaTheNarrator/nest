import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-order-m',
  templateUrl: './order-m.component.html',
  styleUrls: ['./order-m.component.css']
})
export class OrderMComponent {
    @Input() order : any
    visible = true
}
