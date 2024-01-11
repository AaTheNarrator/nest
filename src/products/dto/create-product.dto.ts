import {ApiProperty} from "@nestjs/swagger";

export class CreateProductDto{
    @ApiProperty({example:'Закваска', description:'Название продукта'})
    readonly product_name : string
    @ApiProperty({example:'2.3', description:'Цена за единицу (кг/л) в долларах'})
    readonly unit_price : number
}