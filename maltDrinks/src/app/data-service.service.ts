import { Injectable } from '@angular/core';
import { HttpClient , HttpHeaders} from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class DataService {
    server_address = "http://localhost:5000/"
    addProductToWareHouse(data: { manufacturer_id: any; product_id: number; amount: number; }) {
        return this.http.post('http://localhost:8000/api/addProductToWareHouse',data).subscribe((data)=>{})
    }

    constructor(private http: HttpClient) { }

    getAllRecipe(): Observable<any> {
        return this.http.get<any>('http://localhost:8000/api/getAllProducts');
    }

    getAllInfoForProductById(id : string): Observable<any>{
        return this.http.get<any>('http://localhost:8000/api/getAllInfoForProduct/' + id);
    }

    loginCustomer(login : string, password : string): Observable<any>{
        let data = {login:login, password:password}
        return this.http.post<any>('http://localhost:8000/api/getLoginCustomer',data)
            .pipe(catchError((error)=>{
                if(error.status === 404){
                    console.error('Пользователь не найден')
                }
                return throwError(error)
            }))
    }

    loginManufacturer(login : string, password : string): Observable<any>{
        let data = {login:login, password:password}
        return this.http.post<any>('http://localhost:8000/api/getLoginManufacturer',data)
            .pipe(catchError((error)=>{
                if(error.status === 404){
                    console.error('Пользователь не найден')
                }
                return throwError(error)
            }))
    }

    addToCart(data : any){
        return this.http.post<any>('http://localhost:8000/api/addToCart', data)
    }

    getCart(id:string):Observable<any>{
        return this.http.post<any>('http://localhost:8000/api/getCartById', id)
    }

    deleteFromCart(recipe_id : string, customer : string, amount : string){
        this.http.delete('http://localhost:8000/api/deleteFromCart/' + recipe_id + '/' + customer + '/' + amount).subscribe((data)=>{});
    }

    addOrder(data : any):Observable<any>{
        return this.http.post('http://localhost:8000/api/addOrder',data)
    }

    clearCart(id : string){
        this.http.delete('http://localhost:8000/api/clearCart/' + id).subscribe((data)=>{
            alert("Корзина очищена");
        })
    }

    getOrders(id : string):Observable<any>{
        return this.http.post('http://localhost:8000/api/getOrders',{customer_id:id})
    }

    getOrdersForManufacturer(id : string):Observable<any>{
        return this.http.post('http://localhost:8000/api/getOrdersManufacturer',{manufacturer_id:id})
    }

    getProductFromWarehouse(id : string):Observable<any>{
        return this.http.post('http://localhost:8000/api/getProductsFromWareHouse',{manufacturer_id:id})
    }

    updateWareHouse(data : any){
        return this.http.put('http://localhost:8000/api/updateSklad',data).subscribe((data)=>{})
    }

    deleteFromWareHouse(data : any){
        const httpOption = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
              }),
            body: data
        }
        return this.http.delete('http://localhost:8000/api/deleteFromSklad',httpOption).subscribe((data)=>{})
    }

    getStatistic(data: any):Observable<any>{
        return this.http.post('http://localhost:8000/api/getStatistic',data)
    }

    getAllProducts():Observable<any>{
        return this.http.get('http://localhost:8000/api/getAllProductsForAdd')
    }
    
}
