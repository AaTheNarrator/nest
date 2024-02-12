import { Component } from '@angular/core';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent {
    constructor(private router: Router){
        let data = window.sessionStorage.getItem("jwt_customer")
        if(!data) this.router.navigate(['login'])
    }
}
