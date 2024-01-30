import { Module, forwardRef } from '@nestjs/common';
import { WarehouseController } from './warehouse.controller';
import {WarehouseService} from "./warehouse.service";
import {ProductsModule} from "../products/products.module";
import { SequelizeModule } from '@nestjs/sequelize';
import { Warehouse } from './warehouse.model';
import { Product } from 'src/products/products.model';
import { ManufacturersModule } from 'src/manufacturers/manufacturers.module';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  controllers: [WarehouseController],
  providers:[WarehouseService],
  imports:[
    SequelizeModule.forFeature([
      Warehouse,
      Product
    ]),
    ProductsModule,
    ManufacturersModule,
    forwardRef(()=> AuthModule),
  ]
})
export class WarehouseModule {}
