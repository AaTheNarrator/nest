import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import {OrdersController} from "./orders.controller";
import {SequelizeModule} from "@nestjs/sequelize";
import {Customer} from "../customers/customer.model";
import {Recipe} from "../recipes/recipe.model";
import {Order} from "./order.model";

@Module({
  providers: [OrdersService],
  controllers:[OrdersController],
  imports:[
    SequelizeModule.forFeature([Order,Customer,Recipe])
  ]
})
export class OrdersModule {}
