import {Body, Controller, Get, Post, UseGuards} from '@nestjs/common';
import {ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";
import {ProductsService} from "./products.service";
import {CreateProductDto} from "./dto/create-product.dto";
import {Recipe} from "../recipes/recipe.model";
import {Roles} from "../auth/roles-auth.decorator";
import {JwtAuthGuard} from "../auth/jwt-auth.guard";
import {Product} from "./products.model";

@ApiTags("Продукты")
@Controller('products')
export class ProductsController {

    constructor(private productsService : ProductsService) {
    }


    @ApiOperation({summary:'Создание нового продукта'})
    @ApiResponse({status:200, type:Product})
    @Roles('MANUFACTURER')
    @UseGuards(JwtAuthGuard)
    @Post()
    createProduct(@Body() dto : CreateProductDto){
        return this.productsService.createProduct(dto)
    }


    @ApiOperation({summary:'Список всех продуктов'})
    @ApiResponse({status:200, type:Product})
    @Roles('MANUFACTURER')
    @UseGuards(JwtAuthGuard)
    @Get()
    getAllProducts(){
        return this.productsService.getAllProducts()
    }
}
