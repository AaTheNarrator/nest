import { Module } from '@nestjs/common';
import { CustomersService } from './customers.service';
import { CustomersController } from './customers.controller';
import {SequelizeModule} from "@nestjs/sequelize";
import {Customer} from "./customer.model";
import {Cart} from "../cart/cart.model";
import {Order} from "../orders/order.model";
import {Role} from "../roles/role.model";
import {RolesModule} from "../roles/roles.module";

@Module({
  providers: [CustomersService],
  controllers: [CustomersController],
  imports:[
    SequelizeModule.forFeature([Customer,Cart,Order,Role]),
      RolesModule
  ]
})
export class CustomersModule {}
