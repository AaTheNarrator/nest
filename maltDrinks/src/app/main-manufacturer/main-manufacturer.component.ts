import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main-manufacturer',
  templateUrl: './main-manufacturer.component.html',
  styleUrls: ['./main-manufacturer.component.css']
})
export class MainManufacturerComponent {
    constructor(private router : Router){
        const data = JSON.parse(window.sessionStorage.getItem("jwt_manufacturer")!)
        if(!data) this.router.navigate(['login'])
    }
}
