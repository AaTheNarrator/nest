import { Column, DataType, ForeignKey, Model, Table} from "sequelize-typescript";
import {ApiProperty} from "@nestjs/swagger";
import {Recipe} from "../recipes/recipe.model";
import {Customer} from "../customers/customer.model";


@Table({tableName:'cart', createdAt:false,updatedAt:false})
export class Cart extends Model<Cart>{

    @ApiProperty({example:'1', description:'Идентификатор заказчика'})
    @ForeignKey(()=>Customer)
    @Column({type:DataType.INTEGER})
    customer_id : number

    @ApiProperty({example:'4', description:'Идентификатор рецепта'})
    @ForeignKey(()=>Recipe)
    @Column({type:DataType.STRING})
    recipe_id : number

    @ApiProperty({example:'2', description:'Количество партий'})
    @Column({type:DataType.INTEGER})
    amount : number
}