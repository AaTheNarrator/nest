import {ApiProperty} from "@nestjs/swagger";

export class AddItemToCartDto{
    @ApiProperty({example:'Голубика', description:'Название рецепта'})
    readonly product_name : string
    @ApiProperty({example:'15', description:'Количество продукта'})
    readonly amount : number
}