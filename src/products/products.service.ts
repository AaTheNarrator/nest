import { Injectable } from '@nestjs/common';
import {CreateProductDto} from "./dto/create-product.dto";
import {InjectModel} from "@nestjs/sequelize";
import {Product} from "./products.model";

@Injectable()
export class ProductsService {

    constructor(@InjectModel(Product) private productsRepository : typeof Product) {
    }

    async createProduct(dto: CreateProductDto) {
        return await this.productsRepository.create(dto)
    }

    async getProductByProductName(product_name: string){
        return await this.productsRepository.findOne({where:{product_name}})
    }

    async getAllProducts(){
        return await this.productsRepository.findAll()
    }
}
