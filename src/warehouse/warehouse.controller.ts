import {Body, Controller, Post, Req} from '@nestjs/common';
import {WarehouseService} from "./warehouse.service";
import {CreateProductsInWarehouseDto} from "./dto/create-productsInWarehouse.dto";

@Controller('warehouse')
export class WarehouseController {

    constructor(private warehouseRepository : WarehouseService) {
    }
    @Post()
    addProductToWarehouse(@Body() dto:CreateProductsInWarehouseDto, @Req() req : any){
        return this.warehouseRepository.addProductToWarehouse(dto, req.company.login)
    }
}
