import {forwardRef, Module} from '@nestjs/common';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import {SequelizeModule} from "@nestjs/sequelize";
import {Recipe} from "../recipes/recipes.model";
import {Product} from "./products.model";
import {AuthModule} from "../auth/auth.module";
import {RecipesService} from "../recipes/recipes.service";


@Module({
  controllers: [ProductsController],
  providers: [ProductsService],
  imports:[
    SequelizeModule.forFeature([
      Recipe,
      Product,
    ]),
    forwardRef(()=> AuthModule),
  ],
  exports:[
      ProductsService
  ]
})
export class ProductsModule {}
