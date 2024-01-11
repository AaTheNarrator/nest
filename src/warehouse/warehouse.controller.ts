import {Body, Controller, Post, Req} from '@nestjs/common';
import {WarehouseService} from "./warehouse.service";
import {CreateProductsInWarehouseDto} from "./dto/create-productsInWarehouse.dto";
import { Warehouse } from './warehouse.model';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Склад')
@Controller('warehouse')
export class WarehouseController {

    constructor(private warehouseRepository : WarehouseService) {
    }

    @ApiOperation({summary:'Добавление продукта на склад'})
    @ApiResponse({status:200, type:Warehouse})
    @Post()
    addProductToWarehouse(@Body() dto:CreateProductsInWarehouseDto, @Req() req : any){
        return this.warehouseRepository.addProductToWarehouse(dto, req.company.login)
    }
}
