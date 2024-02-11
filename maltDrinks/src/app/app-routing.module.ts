import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { ProductpageComponent } from './productpage/productpage.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import { StoreComponent } from './store/store.component';
import { LoginComponent } from './login/login.component';
import { MainComponent } from './main/main.component';
import { CartComponent } from './cart/cart.component';
import { OrdersComponent } from './orders/orders.component';
import { MainManufacturerComponent } from './main-manufacturer/main-manufacturer.component';
import { WarehouseComponent } from './warehouse/warehouse.component';
import { OrdersMComponent } from './orders-m/orders-m.component';
import { StatisticsComponent } from './statistics/statistics.component';

const routes: Routes = [
    { path: 'login', component: LoginComponent},
    { path: 'customer', component: MainComponent,children:[
        { path:'store', component: StoreComponent },
        { path: 'product/:id', component:ProductpageComponent},
        { path: 'cart',component:CartComponent},
        { path:'orders',component:OrdersComponent},
        { path: '**', redirectTo:"/store"}
    ]},
    { path:'manufacturer',component:MainManufacturerComponent,children:[
        {path:'warehouse',component:WarehouseComponent},
        {path:'orders',component:OrdersMComponent},
        {path:'statistic',component:StatisticsComponent}
    ]},
    { path:"notfound", component:PagenotfoundComponent},
    { path: '**', redirectTo:"/notfound"}
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
