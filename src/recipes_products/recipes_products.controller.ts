import {Body, Controller, Post, Req, UseGuards} from '@nestjs/common';
import {CreateRecipeProductsDto} from "./dto/create-recipe-product.dto";
import {RecipesProductsService} from "./recipes_products.service";
import {ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";
import {Roles} from "../auth/roles-auth.decorator";
import {JwtAuthGuard} from "../auth/jwt-auth.guard";
import {RecipesProducts} from "./recipes_products.model";

@ApiTags('Рецепты-продукты')
@Controller('recipes-products')
export class RecipesProductsController {

    constructor(private recipeProductService : RecipesProductsService) {
    }

    @ApiOperation({summary:'Добавдение продукта в рецепт'})
    @ApiResponse({status:200, type:RecipesProducts})
    @Roles('MANUFACTURER')
    @UseGuards(JwtAuthGuard)
    @Post()
    addProductToRecipe(@Body() dto : CreateRecipeProductsDto, @Req() req : any){
        return this.recipeProductService.addProductToRecipe(dto, req.company.login)
    }

}
