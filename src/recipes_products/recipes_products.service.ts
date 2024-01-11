import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {CreateRecipeProductsDto} from "./dto/create-recipe-product.dto";
import {InjectModel} from "@nestjs/sequelize";
import {RecipesProducts} from "./recipes_products.model";
import {ProductsService} from "../products/products.service";
import {RecipesService} from "../recipes/recipes.service";
import {Manufacturer} from "../manufacturers/manufacturer.model";
import {ManufacturersService} from "../manufacturers/manufacturers.service";

@Injectable()
export class RecipesProductsService {

    constructor(@InjectModel(RecipesProducts) private recipesProductsRepository : typeof RecipesProducts,
                private productsService : ProductsService,
                private recipesService : RecipesService,
                private manufacturersService : ManufacturersService) {
    }



    async addProductToRecipe(dto : CreateRecipeProductsDto, login : string){
        let recipe = await this.recipesService.getRecipeByRecipeName(dto.recipe_name)
        let product = await this.productsService.getProductByProductName(dto.product_name)
        let manufacturer = await this.manufacturersService.searchManufacturerByLogin(login)

        if(!recipe || !product){
            throw new HttpException('Не существует такого рецепта или продукта',HttpStatus.BAD_REQUEST)
        }

        if(recipe.manufacturer_id != manufacturer.manufacturer_id){
            throw new HttpException('У вас не такого рецепта',HttpStatus.BAD_REQUEST)
        }

        let final_data = {
            recipe_id : recipe.recipe_id,
            product_id : product.product_id,
            amount_product : dto.amount_product
        }

        return await this.recipesProductsRepository.create(final_data)
    }
}
