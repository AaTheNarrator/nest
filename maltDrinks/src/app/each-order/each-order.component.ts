import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-each-order',
  templateUrl: './each-order.component.html',
  styleUrls: ['./each-order.component.css']
})
export class EachOrderComponent {
    @Input() each_order : any
}
