import { Component } from '@angular/core';
import { DataService } from '../data-service.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
    selector: 'app-statistics',
    templateUrl: './statistics.component.html',
    styleUrls: ['./statistics.component.css']
})
export class StatisticsComponent {
    statistic : any

    constructor(private dataService : DataService,
        private http : HttpClient){
        const jwt = JSON.parse(window.sessionStorage.getItem('jwt_manufacturer')!)
        console.log(jwt)
        // const jwt_token = JSON.parse(jwt!).token
        this.http.get('https://5000-aathenarrator-nest-axf6pocp2pz.ws-eu108.gitpod.io/orders/getStats',{
            headers : new HttpHeaders({
                "Authorization" : "Bearer " + jwt.token
            })
        }).subscribe((data)=>{
            console.log(data)
            this.statistic = data
        })
    }

    downloadFile(){
        const jwt = JSON.parse(window.sessionStorage.getItem('jwt_manufacturer')!)
    this.http.get('https://5000-aathenarrator-nest-axf6pocp2pz.ws-eu108.gitpod.io/orders/download',{
        headers : new HttpHeaders({
            "Authorization" : "Bearer " + jwt.token,
        }),
        responseType: 'blob' // Переместить responseType за пределы headers
    }).subscribe((data : any)=>{
        const blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
        const fileName = 'stats.xlsx';
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = fileName;
        document.body.appendChild(link);
        link.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(link);
    })
    }
}
