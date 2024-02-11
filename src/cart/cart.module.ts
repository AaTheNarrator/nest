import { Module, forwardRef } from '@nestjs/common';
import { CartService } from './cart.service';
import { CartController } from './cart.controller';
import {SequelizeModule} from "@nestjs/sequelize";
import {Recipe} from "../recipes/recipes.model";
import {Customer} from "../customers/customer.model";
import {Cart} from "./cart.model";
import { CustomersModule } from 'src/customers/customers.module';
import { RecipesModule } from 'src/recipes/recipes.module';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  providers: [CartService],
  controllers: [CartController],
  imports:[
    SequelizeModule.forFeature([Cart,Customer,Recipe]),
    forwardRef(()=> CustomersModule),
    forwardRef(()=> RecipesModule),
    forwardRef(()=> AuthModule),
  ]
})
export class CartModule {}
