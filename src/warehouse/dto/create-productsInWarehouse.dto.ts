import { ApiProperty } from "@nestjs/swagger"

export class CreateProductsInWarehouseDto{
    @ApiProperty({example:'Закваска', description:'Название продукта'})
    readonly product_name : string
    @ApiProperty({example:'250', description:'Количество продукта'})
    readonly amount_product : number
}