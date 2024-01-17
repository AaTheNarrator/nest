import { Module } from '@nestjs/common';
import {SequelizeModule} from "@nestjs/sequelize";
import {ConfigModule} from "@nestjs/config";
import { RecipesModule } from './recipes/recipes.module';
import { ManufacturersModule } from './manufacturers/manufacturers.module';
import {Manufacturer} from "./manufacturers/manufacturer.model";
import {Recipe} from "./recipes/recipe.model";
import { ProductsModule } from './products/products.module';
import {Product} from "./products/products.model";
import { RecipesProductsModule } from './recipes_products/recipes_products.module';
import {RecipesProducts} from "./recipes_products/recipes_products.model";
import { WarehouseService } from './warehouse/warehouse.service';
import { WarehouseModule } from './warehouse/warehouse.module';
import {Warehouse} from "./warehouse/warehouse.model";
import { CustomersModule } from './customers/customers.module';
import { CartModule } from './cart/cart.module';
import { OrdersController } from './orders/orders.controller';
import { OrdersModule } from './orders/orders.module';
import {Cart} from "./cart/cart.model";
import {Customer} from "./customers/customer.model";
import {Order} from "./orders/order.model";
import { RolesModule } from './roles/roles.module';
import {Role} from "./roles/role.model";
import { AuthModule } from './auth/auth.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import path, { join } from 'path';



@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath:'.env'
    }),
    ServeStaticModule.forRoot({
      rootPath: path.resolve(__dirname, 'static')
    }),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: Number(process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      models: [
          Manufacturer,
          Recipe,
          Product,
          RecipesProducts,
          Warehouse,
          Cart,
          Customer,
          Order,
          Role
      ],
      autoLoadModels: true
    }),
    RecipesModule,
    ManufacturersModule,
    ProductsModule,
    RecipesProductsModule,
    WarehouseModule,
    CustomersModule,
    CartModule,
    OrdersModule,
    RolesModule,
    AuthModule,

  ],
  controllers: [OrdersController, ],
  providers: [WarehouseService],
})
export class AppModule {
  constructor() {
    console.log(process.env.POSTGRES_DB)
  }
}
