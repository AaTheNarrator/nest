import {BelongsToMany, Column, DataType, ForeignKey, HasMany, Model, Table} from "sequelize-typescript";
import {ApiProperty} from "@nestjs/swagger";
import {Recipe} from "../recipes/recipe.model";
import {Product} from "../products/products.model";
import {Warehouse} from "../warehouse/warehouse.model";
import {Customer} from "../customers/customer.model";


@Table({tableName:'Orders'})
export class Order extends Model<Order>{

    @ApiProperty({example:'2', description:'Идентификатор заказа'})
    @Column({type:DataType.INTEGER, autoIncrement:true, unique:true, primaryKey:true})
    order_id : number

    @ApiProperty({example:'1', description:'Идентификатор заказчика'})
    @ForeignKey(()=>Customer)
    @Column({type:DataType.INTEGER})
    customer_id : number

    @ApiProperty({example:'4', description:'Идентификатор рецепта'})
    @ForeignKey(()=>Recipe)
    @Column({type:DataType.INTEGER})
    recipe_id : number

    @ApiProperty({example:'2', description:'Количество партий'})
    @Column({type:DataType.INTEGER})
    amount : number

    @ApiProperty({example:'20-12-2023', description:'Дата доставки'})
    @Column({type:DataType.DATE})
    delivery_date : number

    @ApiProperty({example:'2560', description:'Стоимость заказа'})
    @Column({type:DataType.INTEGER})
    price : number
}