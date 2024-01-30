import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { CartService } from './cart.service';
import { AddItemToCartDto } from './dto/create-new-item-in-cart.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/auth/roles-auth.decorator';
import { Cart } from './cart.model';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@ApiTags('Корзина')
@Controller('cart')
export class CartController {

    constructor(private cartService : CartService){}

    @ApiOperation({summary:'Добавление продукта в корзину'})
    @ApiResponse({status:200, type:Cart})
    @Roles('CUSTOMER')
    @UseGuards(JwtAuthGuard)
    @Post()
    addToCart(@Body() dto : AddItemToCartDto, @Req() req : any){
        return this.cartService.addProductToCart(dto, req.company.login)
    }


    @ApiOperation({summary:'Вывод корзины'})
    @ApiResponse({status:200, type:Cart})
    @Roles('CUSTOMER')
    @UseGuards(JwtAuthGuard)
    @Get()
    getCartByLogin( @Req() req : any){
        return this.cartService.getCartByLogin(req.company.login)
    }
}
