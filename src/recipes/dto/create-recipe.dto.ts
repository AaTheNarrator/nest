import {ApiProperty} from "@nestjs/swagger";

export class CreateRecipeDto{
    @ApiProperty({example:'Ежевичный квас', description:'Название рецепта'})
    readonly recipe_name : string
    @ApiProperty({example:'Квас обладающий волшебным действием под действием ежевики', description:'Описание рецепта'})
    readonly description : string
}