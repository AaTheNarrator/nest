import { Module } from '@nestjs/common';
import { WarehouseController } from './warehouse.controller';
import {WarehouseService} from "./warehouse.service";
import {ProductsModule} from "../products/products.module";

@Module({
  controllers: [WarehouseController],
  providers:[WarehouseService],
  imports:[
      ProductsModule,
  ]
})
export class WarehouseModule {}
