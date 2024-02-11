import { Component } from '@angular/core';
import { DataService } from '../data-service.service';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient , HttpHeaders} from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent {
    textOnButton = "Войти как производитель"
    infoText = "Это страница предназначена для входа как заказчик"

    loginC : string = ""
    passwordC : string = ""
    loginM : string = ""
    passwordM : string = ""


    constructor(private dataService:DataService,
        private router : Router,
        private http : HttpClient){}

    checkCustomer(){
        this.dataService.loginCustomer(this.loginC,this.passwordC)
            .subscribe(
                (data)=>{
                    window.sessionStorage.clear()
                    window.sessionStorage.setItem("jwt_customer", data.token)
                    this.router.navigate(['/customer/store'])
                },
                (err)=>{
                    alert(err.error.error)
                }
            )
    }

    checkManufacturer(){
        this.http.post(this.dataService.server_address + "auth/login/manufacturer",{
            login : this.loginM,
            password : this.passwordM
        }).subscribe((data : any)=>{
            window.sessionStorage.clear()
            window.sessionStorage.setItem("jwt_manufacturer", data.token)
            this.router.navigate(['/manufacturer/orders'])
        })
    }
    
    //Movement
    private isLeft = true
    moveRectangle() {
        const secondRectangle = document.getElementById('second-rectangle');
        const firstRectangle = document.getElementById('first-rectangle')?.offsetWidth;
      
        if (this.isLeft && secondRectangle) {
            secondRectangle.style.transition = 'transform 0.5s ease';
            secondRectangle.style.transform = `translateX(${firstRectangle! / 2}px)`;
            this.textOnButton = "Войти как заказчик"
            this.infoText = "Это страница предназначена для входа как производитель"
        } 
        else {
            secondRectangle!.style.transition = 'transform 0.5s ease'
            secondRectangle!.style.transform = 'translateX(0)'
            this.textOnButton = "Войти как производитель"
            this.infoText = "Это страница предназначена для входа как заказчик"
        }
      
        this.isLeft = !this.isLeft;
      }
}
