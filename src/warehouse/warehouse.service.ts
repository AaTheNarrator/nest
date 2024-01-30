import {HttpException, HttpStatus, Inject, Injectable, forwardRef} from '@nestjs/common';
import {InjectModel} from "@nestjs/sequelize";
import {Warehouse} from "./warehouse.model"
import {ProductsService} from "../products/products.service";
import {CreateProductsInWarehouseDto} from "./dto/create-productsInWarehouse.dto";
import { ManufacturersService } from 'src/manufacturers/manufacturers.service';

@Injectable()
export class WarehouseService {

    constructor(@InjectModel(Warehouse) private warehouseRepository: typeof Warehouse,
                private productsService : ProductsService,
                private manufacturerService : ManufacturersService) {
    }

    async addProductToWarehouse(dto : CreateProductsInWarehouseDto, login : string){
        let manufacturer = await this.manufacturerService.searchManufacturerByLogin(login)
        let product = await this.productsService.getProductByProductName(dto.product_name)

        if(!product){
            throw new HttpException('Такого продукта не существует', HttpStatus.NOT_FOUND)
        }

        let final_data = {
            manufacturer_id : manufacturer.manufacturer_id,
            product_id: product.product_id,
            amount_product: dto.amount_product
        }

        return await this.warehouseRepository.create(final_data)
    }

    async getProductInWarehouseByLoginManufacturer(login : string){
        let manufacturer = await this.manufacturerService.searchManufacturerByLogin(login)
        return await this.warehouseRepository.findAll({where:{manufacturer_id:manufacturer.manufacturer_id},include:{all:true}})
    }
}
