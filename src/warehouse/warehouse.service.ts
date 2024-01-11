import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {InjectModel} from "@nestjs/sequelize";
import {Warehouse} from "./warehouse.model";
import {ProductsService} from "../products/products.service";
import {CreateProductsInWarehouseDto} from "./dto/create-productsInWarehouse.dto";

@Injectable()
export class WarehouseService {

    // constructor(@InjectModel(Warehouse) private warehouseRepository: typeof Warehouse,
    //             private productsService : ProductsService) {
    // }

    async addProductToWarehouse(dto : CreateProductsInWarehouseDto, manufacturer_id : number){
        // let product = await this.productsService.getProductByProductName(dto.product_name)

        // if(!product){
        //     throw new HttpException('Такого продукта не существует', HttpStatus.NOT_FOUND)
        // }

        // let final_data = {
        //     manufacturer_id : manufacturer_id,
        //     product_id: product.product_id,
        //     amount_product: dto.amount_product
        // }

        // return await this.warehouseRepository.create(final_data)
    }


}
