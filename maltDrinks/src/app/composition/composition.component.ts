import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-composition',
    templateUrl: './composition.component.html',
    styleUrls: ['./composition.component.css']
})
export class CompositionComponent {
    @Input() product : any
}
