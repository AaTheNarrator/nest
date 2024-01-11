import {BelongsTo, BelongsToMany, Column, DataType, ForeignKey, Model, Table} from "sequelize-typescript";
import {Product} from "../products/products.model";
import {RecipesProducts} from "../recipes_products/recipes_products.model";
import {Cart} from "../cart/cart.model";
import {Order} from "../orders/order.model";
import {Customer} from "../customers/customer.model";
import {ApiProperty} from "@nestjs/swagger";
import {Role} from "../roles/role.model";
import {Manufacturer} from "../manufacturers/manufacturer.model";

interface RecipeCreationAttrs{
    readonly recipe_name : string
    readonly description : string
    readonly manufacturer_id : number
}

@Table({tableName:'recipes'})
export class Recipe extends Model<Recipe,RecipeCreationAttrs>{

    @ApiProperty({example:'2', description:'Идентификатор рецепта'})
    @Column({type:DataType.INTEGER, autoIncrement:true, unique:true, primaryKey:true})
    recipe_id : number

    @ApiProperty({example:'Ежевичный квас', description:'Название рецепта'})
    @Column({type:DataType.STRING})
    recipe_name : string

    @ApiProperty({example:'Квас обладающий волшебным действием под действием ежевики', description:'Описание рецепта'})
    @Column({type:DataType.STRING})
    description : string

    @ApiProperty({example:'1', description:'Идентификатор производителя'})
    @Column({type:DataType.INTEGER})
    manufacturer_id : number

    @BelongsTo(()=>Manufacturer,'manufacturer_id')
    manufacturer : Manufacturer

    @BelongsToMany(()=>Product, ()=>RecipesProducts)
    products : Product[]

    @BelongsToMany(()=>Customer, ()=>Cart)
    customerFromCart : Customer[]

    @BelongsToMany(()=>Customer, ()=>Cart)
    customerFromOrder : Customer[]
}