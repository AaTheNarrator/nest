import { Component, Input, ElementRef, OnInit, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-each-statistic',
  templateUrl: './each-statistic.component.html',
  styleUrls: ['./each-statistic.component.css']
})
export class EachStatisticComponent implements OnInit {
    @Input() each: any;

    constructor(private el: ElementRef) {}

    ngOnInit() {
        if (this.each.profit_change > 0) {
            this.setColor('#66D720');
        }else{
            this.setColor('#F54235');
        }
    }


    private setColor(color: string) {
        const items = this.el.nativeElement.querySelectorAll('.item1');
        items.forEach((item: HTMLElement) => {
            item.style.color = color;
        });
    }
}
