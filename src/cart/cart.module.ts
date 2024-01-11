import { Module, forwardRef } from '@nestjs/common';
import { CartService } from './cart.service';
import { CartController } from './cart.controller';
import {SequelizeModule} from "@nestjs/sequelize";
import {Recipe} from "../recipes/recipe.model";
import {Customer} from "../customers/customer.model";
import {Cart} from "./cart.model";
import { CustomersModule } from 'src/customers/customers.module';
import { RecipesModule } from 'src/recipes/recipes.module';

@Module({
  providers: [CartService],
  controllers: [CartController],
  imports:[
    SequelizeModule.forFeature([Cart,Customer,Recipe]),
    forwardRef(()=> CustomersModule),
    forwardRef(()=> RecipesModule),
  ]
})
export class CartModule {}
