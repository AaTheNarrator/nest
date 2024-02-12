import { Component } from '@angular/core';
import { DataService } from '../data-service.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.css']
})
export class StoreComponent {
  products : any;
  filter_products : any
    constructor(private dataService: DataService,
      private http : HttpClient){
        const jwt = window.sessionStorage.getItem('jwt_customer')
        const jwt_token = JSON.parse(jwt!).token
        this.http.get(this.dataService.server_address + "recipes",{
          headers : new HttpHeaders({
            "Authorization" : "Bearer " + jwt_token
          })
        }).subscribe((data : any)=>{
          for (let i = 0; i < data.length; i++){
            data[i]["path_to_photo"] = this.dataService.server_address + data[i].path_to_photo
          }
          console.log(data)
          this.products = data
          this.filter_products = data
        })
    }
    
    onInputChange(event: any) {
      this.filter_products = this.products.filter((el : any) => el.recipe_name.startsWith(event.target.value))
    }
    
    onSortOrderChange(event: any) {
      const selectedValue = event.target.value;
      switch (selectedValue){
        case "name_asc":
          this.filter_products = this.products.sort((a: any, b: any)=>{
            if(a.recipe_name > b.recipe_name){
              return 1
            }else {
              return -1
            }
          })
          break;
        case "name_desc":
          this.filter_products = this.products.sort((a: any, b: any)=>{
            if(a.recipe_name < b.recipe_name){
              return 1
            }else {
              return -1
            }
          })
          break;
      }
  } 
}
