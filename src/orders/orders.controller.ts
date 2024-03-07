import { Body, Controller, Get, Post, Req, Res, UseGuards } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDTO } from './dto/CreateOrder.dto';
import { Roles } from 'src/auth/roles-auth.decorator';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Order } from './order.model';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import * as fs from 'fs';
import * as Excel from 'exceljs';

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

    @ApiOperation({summary:'Возвращение статистики протзводителя'})
    @ApiResponse({status:200, type:Order})
    @Roles('MANUFACTURER')
    @UseGuards(JwtAuthGuard)
    @Get('/getStats')
    getStats(@Req() req : any){
        return this.orderService.getStats(req.company.login)
    }

    @ApiOperation({summary:'Возвращение статистики протзводителя'})
    @ApiResponse({status:200, type:Order})
    @Roles('MANUFACTURER')
    @UseGuards(JwtAuthGuard)
    @Get('/download')
    async downloadStats(@Req() req : any, @Res() res : any){
        const workbook = new Excel.Workbook();
        const worksheet = workbook.addWorksheet('Статистика');
        worksheet.columns = [
            { header: 'Месяц', key: 'date', width: 30 },
            { header: 'Зарабаток', key: 'sum', width: 30 },
            { header: 'Прибыль', key: 'diff_by_last_month', width: 30 },
            { header: 'Прибыль в %', key: 'profit_change_percent', width: 30 }
        ];
        let stats = await this.orderService.getStats(req.company.login)
        stats.forEach((row)=>{
            worksheet.addRow(row)
        })
        console.log(1)
        await workbook.xlsx.writeFile('example.xlsx')
        const fileStream = fs.createReadStream('example.xlsx');
        res.set({
            'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
            'Content-Disposition': 'attachment; filename=stats.xlsx' // Добавлены кавычки
        });
    
        fileStream.pipe(res);
    }
}
