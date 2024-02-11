import { Component } from '@angular/core';
import { DataService } from '../data-service.service';

@Component({
    selector: 'app-statistics',
    templateUrl: './statistics.component.html',
    styleUrls: ['./statistics.component.css']
})
export class StatisticsComponent {
    statistic : any

    constructor(private dataService : DataService){
        const id = JSON.parse(window.sessionStorage.getItem('manufacturer_id')!)
        this.dataService.getStatistic(id).subscribe((response)=>[
            this.statistic = response
        ])
    }
}
