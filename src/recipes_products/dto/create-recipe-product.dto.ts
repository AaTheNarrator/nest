import {ApiProperty} from "@nestjs/swagger";

export class CreateRecipeProductsDto{
    @ApiProperty({example:'Закваска', description:'Название продукта'})
    readonly product_name : string
    @ApiProperty({example:'Ежевичный квас', description:'Название рецепта'})
    readonly recipe_name : string
    @ApiProperty({example:'200', description:'Количества продукта'})
    readonly amount_product : number
}