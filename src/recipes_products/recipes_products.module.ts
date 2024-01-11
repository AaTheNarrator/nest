import { Module } from '@nestjs/common';
import { RecipesProductsController } from './recipes_products.controller';
import { RecipesProductsService } from './recipes_products.service';
import {SequelizeModule} from "@nestjs/sequelize";
import {Recipe} from "../recipes/recipe.model";
import {Product} from "../products/products.model";
import {RecipesProducts} from "./recipes_products.model";
import {ProductsModule} from "../products/products.module";
import {RecipesModule} from "../recipes/recipes.module";
import {AuthModule} from "../auth/auth.module";
import {ManufacturersModule} from "../manufacturers/manufacturers.module";

@Module({
  controllers: [RecipesProductsController],
  providers: [RecipesProductsService],
  imports:[
  SequelizeModule.forFeature([
    Recipe,
    Product,
    RecipesProducts
  ]),
      ProductsModule,
      RecipesModule,
      AuthModule,
      ManufacturersModule
  ]
})
export class RecipesProductsModule {}
