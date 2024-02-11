import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProductsComponent } from './products/products.component';
import { HttpClientModule } from '@angular/common/http';
import { ProductpageComponent } from './productpage/productpage.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import { StoreComponent } from './store/store.component';
import { CompositionComponent } from './composition/composition.component';
import { LoginComponent } from './login/login.component';
import { MainComponent } from './main/main.component';
import { FormsModule } from '@angular/forms';
import { CartComponent } from './cart/cart.component';
import { ProductInCartComponent } from './product-in-cart/product-in-cart.component';
import { OrdersComponent } from './orders/orders.component';
import { OrderComponent } from './order/order.component';
import { DateformatPipe } from './dateformat.pipe';
import { MainManufacturerComponent } from './main-manufacturer/main-manufacturer.component';
import { WarehouseComponent } from './warehouse/warehouse.component';
import { OrdersMComponent } from './orders-m/orders-m.component';
import { OrderMComponent } from './order-m/order-m.component';
import { ProductInWarehouseComponent } from './product-in-warehouse/product-in-warehouse.component';
import { CommonModule } from '@angular/common';
import { EachOrderComponent } from './each-order/each-order.component';
import { StatisticsComponent } from './statistics/statistics.component';
import { EachStatisticComponent } from './each-statistic/each-statistic.component';

@NgModule({
  declarations: [
    AppComponent,
    ProductsComponent,
    ProductpageComponent,
    PagenotfoundComponent,
    StoreComponent,
    CompositionComponent,
    LoginComponent,
    MainComponent,
    CartComponent,
    ProductInCartComponent,
    OrdersComponent,
    OrderComponent,
    DateformatPipe,
    MainManufacturerComponent,
    WarehouseComponent,
    OrdersMComponent,
    OrderMComponent,
    ProductInWarehouseComponent,
    EachOrderComponent,
    StatisticsComponent,
    EachStatisticComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    CommonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
