import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDTO } from './dto/CreateOrder.dto';
import { Roles } from 'src/auth/roles-auth.decorator';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Order } from './order.model';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@ApiTags('Заказы')
@Controller('orders')
export class OrdersController {

    constructor(private orderService : OrdersService){}

    @ApiOperation({summary:'Получение заказов пользователя'})
    @ApiResponse({status:200, type:Order})
    @Roles('CUSTOMER')
    @UseGuards(JwtAuthGuard)
    @Get()
    getPrice(@Req() req : any){
        return this.orderService.getOrders(req.company.login)
    }


    @ApiOperation({summary:'Добавление заказа'})
    @ApiResponse({status:200, type:Order})
    @Roles('CUSTOMER')
    @UseGuards(JwtAuthGuard)
    @Post()
    createOrder(@Req() req : any,@Body() dto : CreateOrderDTO){
        return this.orderService.createOrder(dto, req.company.login)
    }
}
