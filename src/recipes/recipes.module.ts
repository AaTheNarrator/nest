import {forwardRef, Module} from '@nestjs/common';
import { RecipesController } from './recipes.controller';
import { RecipesService } from './recipes.service';
import {SequelizeModule} from "@nestjs/sequelize";
import {Recipe} from "./recipes.model";
import {Manufacturer} from "../manufacturers/manufacturer.model";
import {Product} from "../products/products.model";
import {Cart} from "../cart/cart.model";
import {Customer} from "../customers/customer.model";
import {Order} from "../orders/order.model";
import {AuthModule} from "../auth/auth.module";
import {ManufacturersModule} from "../manufacturers/manufacturers.module";
import {ProductsService} from "../products/products.service";


@Module({
  controllers: [RecipesController],
  providers: [RecipesService],
  imports:[
      SequelizeModule.forFeature([
          Recipe,
          Manufacturer,
          Product,
          Cart,
          Customer,
          Order
      ]),
      forwardRef(()=> AuthModule),
      ManufacturersModule
  ],
    exports:[
        RecipesService
    ]
})
export class RecipesModule {}
