import { Module, forwardRef } from '@nestjs/common';
import { OrdersService } from './orders.service';
import {OrdersController} from "./orders.controller";
import {SequelizeModule} from "@nestjs/sequelize";
import {Customer} from "../customers/customer.model";
import {Recipe} from "../recipes/recipes.model";
import {Order} from "./order.model";
import { CustomersModule } from 'src/customers/customers.module';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  providers: [OrdersService],
  controllers:[OrdersController],
  imports:[
    SequelizeModule.forFeature([Order,Customer,Recipe]),
    CustomersModule,
    forwardRef(()=> AuthModule),
  ]
})
export class OrdersModule {}
