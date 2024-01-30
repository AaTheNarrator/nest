import {Body, Controller, Get, Post, Req, UseGuards} from '@nestjs/common';
import {WarehouseService} from "./warehouse.service";
import {CreateProductsInWarehouseDto} from "./dto/create-productsInWarehouse.dto";
import { Warehouse } from './warehouse.model';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/auth/roles-auth.decorator';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@ApiTags('Склад')
@Controller('warehouse')
export class WarehouseController {

    constructor(private warehouseService : WarehouseService) {
    }

    @ApiOperation({summary:'Добавление продукта на склад'})
    @ApiResponse({status:200, type:Warehouse})
    @Roles('MANUFACTURER')
    @UseGuards(JwtAuthGuard)
    @Post()
    addProductToWarehouse(@Body() dto:CreateProductsInWarehouseDto, @Req() req : any){
        return this.warehouseService.addProductToWarehouse(dto, req.company.login)
    }

    @ApiOperation({summary:'Продукты на складе'})
    @ApiResponse({status:200, type:Warehouse})
    @Roles('MANUFACTURER')
    @UseGuards(JwtAuthGuard)
    @Get()
    getProductInWarehouseByManufacturer(@Req() req : any){
        console.log(req.company)
        return this.warehouseService.getProductInWarehouseByLoginManufacturer(req.company.login)
    }
}
